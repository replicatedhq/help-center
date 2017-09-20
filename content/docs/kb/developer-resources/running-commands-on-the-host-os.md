---
date: "2016-08-01T00:00:00Z"
lastmod: "2016-08-01T00:00:00Z"
title: "Running Commands on the Host OS"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Application YAML"]
---

The current version of Replicted is delivered as Docker images and run in containers on every supported operating system. The Replicated containers are built on top of a small Alpine Linux base image. Sometimes, it's desirable to access the host operating system and execute commands or change the environment in some way.

{{< warning title="Warning" >}}
Remember that Replicated supports many different operating systems that will be running a variety of kernels, package managers and more. Any script you choose to run on the host OS should be portable and run across any supported system.
{{< /warning >}}

Replicated can leverage the Docker socket file to create a container that can connect to the host over SSH and run commands over that SSH connection. Anything you execute on the host should be tested thoroughly across all operating systems. It is possible to make breaking changes to the host that cannot be recovered remotely.

Finally, the below example uses a `curl | bash` command in a script. You should carefully consider any security and supportability concerns that come from changing the host itself.

```yaml
---
replicated_api_version: "2.3.5"

name: "Application"

properties:
  logo_url: http://www.replicated.com/images/logo.png
  console_title: Application

components:
  - name: SSH
    containers:
      # Executes a bash script to generate keys
      # Writes the public key to the host's authorized_keys
      - source: public
        image_name: debian
        version: jessie
        ephemeral: true
        publish_events:
          - name: SSH Key Created
            trigger: container-stop
            subscriptions:
              - component: Bootstrap
                container: debian
                action: start
        volumes:
          - host_path: /root/.ssh
            container_path: /.ssh
            is_ephemeral: true
          - host_path: /keys
            container_path: /keys
            is_ephemeral: true

        cmd: '["/create_ssh_key.sh"]'
        config_files:
          - filename: /create_ssh_key.sh
            file_mode: 0700
            contents: |
              #!/bin/bash

              echo "Check if the public key exists in the authorized keys."
              if [ -f /keys/id_rsa.pub ]; then
                grep -f /keys/id_rsa.pub /.ssh/authorized_keys
                if [ "$?" -eq "0" ]; then
                  # The key exists and is in the authorized keys.
                  exit 0
                fi
              fi

              echo "Generate a new key, if it does not exist"
              if [ ! -f /keys/id_rsa.pub ]; then
                echo "Install the ssh-keygen command"
                apt-get update && apt-get install -y keychain && rm -rf /var/lib/apt/lists/*

                echo "Create an ssh key"
                ssh-keygen -f /keys/id_rsa -t rsa -N ''
              fi

              echo "Write the public key to the authorized keys file"
              cat /keys/id_rsa.pub >> /.ssh/authorized_keys

  # Connects to host over SSH as root and run a command
  - name: Bootstrap
    containers:   
      - source: public
        image_name: debian
        version: jessie
        ephemeral: true
        publish_events:
          - name: Install Complete
            trigger: container-stop
            subscriptions:
              - component: SSH
                container: alpine
                action: start
        volumes:
          - host_path: /keys
            container_path: /keys
            is_ephemeral: true
        cmd: '["/run_in_container.sh"]'
        config_files:
          - filename: /run_in_container.sh
            file_mode: 0700
            contents: |
              #!/bin/bash

              ## It would be preferrable to create a custom image with this next line already installed.
              apt-get update && apt-get install -y ssh && rm -rf rm -rf /var/lib/apt/lists/*

              # SSH to the host and then execute the "run_on_host.sh" script on the host
              ssh -i /keys/id_rsa -o StrictHostKeyChecking=no root@{{repl ThisNodePrivateIPAddress}} 'bash -s' < /run_on_host.sh
          - filename: /run_on_host.sh
            file_mode: 0700
            contents: |
              #!/bin/bash

              ## This script will be executed on the host operating system and can use replicated template functions

              ## It's possible to access license properties here
              my_license_val='{{repl LicenseFieldValue "my_custom_field"}}'

              ## Also, config options
              my_config_val='{{repl ConfigOption "my_config_option"}}'

              ## Complete example:
              if [ '{{repl ConfigOption "update_management_console" }}' = "true" ]; then
                nohup sh -c "curl -sSL https://get.replicated.com/docker | sudo bash && curl -sSL https://get.docker.com | sudo bash" &
              fi
  - name: Application
    containers:
      # Replace this container with a container in your application that never terminates
      - source: public
        image_name: alpine
        version: 3.3
        cmd: '["tail", "-f", "/dev/null"]'
config: []
```
