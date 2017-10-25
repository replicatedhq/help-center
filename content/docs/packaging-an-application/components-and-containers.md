---
date: "2016-07-03T04:02:20Z"
title: "Components And Containers"
description: "The `components` section of the Replicated YAML defines how the containers will be created and started."
weight: "205"
categories: [ "Packaging an Application" ]
tags: [ "Application YAML" ]
index: "docs"
---

The `components` section of the YAML defines how the containers will be created and started. A component is
a group of one or more containers that are guaranteed to run on the same node.

{{< linked_headline "Image Registry Location" >}}

For each container we must supply some basic information. First the source from which we will pull this image. This can be either a third
party private or public registry (ie Docker Hub Registry, Quay.io, or your own public registry) or Replicated's private vendor registry
(`replicated`). We must then specify the name of the image (`image_name`) and the tag (`version`).

```yaml
components:
- name: DB
  containers:
  - source: public
    image_name: redis
    version: latest
    when: '{{repl ConfigOptionEquals "use_external_db" "0" }}'
    ...
```

When including a public image please use a valid image name. This can be any format that the Docker client is able to pull, including:

- image (trusted image from Docker Hub)
- namespace/image (public image from Docker Hub)
- host/namespace/image (public image from a different host)

For Replicated private images (when `source` = `replicated`, do not include the namespace in the `image_name`. The `image_name` field should only
include the image name, not the hostname or namespace. The `when` option allows container to be started conditionally.

{{< linked_headline "Privileged" >}}

In some advanced scenarios, we may need to run our container in privileged mode or specify a hostname to be set in the container. This is possible in the YAML by adding a couple of optional tags.

```yaml
  - source: public
    image_name: redis
    ...
    privileged: true
    hostname: host01
```

{{< linked_headline "Ephemeral" >}}

Sometimes we may want a container that is not meant to continue running for the lifetime of the application. In this case we can mark that container as ephemeral.

```yaml
  - source: replicated
    image_name: startup
    ...
    ephemeral: true
```

{{< linked_headline "Container Resource Constraints" >}}

Replicated supports the following constraint parameters:

- `cpu_shares` How much CPU time is allotted to the container details.
- `memory_limit` How much memory is allotted to the container details.
- `memory_swap_limit` How large a memory swap is allocated to the container details.

*note: Replicated requires you to specify entire byte count as shown below*

```yaml
  - source: replicated
    image_name: redis
    ...
    cpu_shares: "1024"
    memory_limit: "8000000000" #8GB
    memory_swap_limit: "1000000000" #1GB
```

{{< linked_headline "CMD" >}}

Next we can optionally define a container CMD to execute when running our container.

```yaml
  - source: public
    image_name: redis
    ...
    cmd: '["redis-server", "--appendonly", "yes"]'
```

{{< linked_headline "Config Files" >}}

The next section contains inline configuration files that we can supply to our container. Replicated will create a file within the
container with the specified path (filename) and contents. You may optionally specify an octal permissions mode as a string (file_mode),
and/or the numeric uid of a user & group (file_owner) to be applied to the resulting file in the container.

```yaml
    config_files:
    - filename: /elasticsearch/config/elasticsearch.yml
      file_mode: "0644"
      file_owner: "100"
      contents: |
        path:
          data: /data/data
          logs: /data/log
          plugins: /elasticsearch/plugins
          work: /data/work
        http.cors.enabled: true
        http.cors.allow-origin: /https?:\/\/{{repl ConfigOption "hostname" }}(:[0-9]+)?/
```

{{< linked_headline "GitHub Reference" >}}

It is also possible to specify a file as a GitHub Reference, where the ref is the SHA of the commit. This ref will need to be updated any
time the file changes (we cache the remote file to remove this external dependency from the install time processes). The repository will
either need to be public or you will need to connect your GitHub account via the App Settings link of the Replicated Vendor Portal.
(Supports config files only)

```yaml
    config_files:
    - filename: /elasticsearch/config/elasticsearch.yml
      source: github
      owner: getelk
      repo: elasticsearch
      path: files/elasticsearch.yml
      ref: c3636b396b2df172926816be5660c9cabc8c5355
      file_mode: "0644"
      file_owner: "100"
```

{{< linked_headline "Customer Files" >}}

It can also be helpful to request a customer supplied file. This file can be referenced by the name parameter and will be created within
the container at the specified path (filename).

```yaml
    customer_files:
    - name: logstash_input_lumberjack_cert_file
      filename: /opt/certs/logstash-forwarder.crt
      file_mode: "0600"
      file_owner: "0"
    - name: logstash_input_lumberjack_key_file
      filename: /opt/certs/logstash-forwarder.key
      file_mode: "0600"
      file_owner: "0"
```

{{< linked_headline "Environment Variables" >}}

Next we have the option of specifying environment variables. There is also a flag provided to exclude anything secret from the support bundle.

```yaml
  env_vars:
    - name: AWS_ACCESS_KEY_ID
      static_val: '{{repl ConfigOption "logstash_input_sqs_aws_access_key" }}'
      is_excluded_from_support: true
    - name: AWS_SECRET_ACCESS_KEY
      static_val: '{{repl ConfigOption "logstash_input_sqs_aws_secret_key" }}'
      is_excluded_from_support: true
```

{{< note title="Sensitive data" >}}
Having environment variables in Support Bundles can be invaluable for troubleshooting.   However, environment variables can contain sensitive data.  Setting `is_excluded_from_support` to `true` will exclude them from Support Bundles.
{{< /note >}}

{{< linked_headline "Ports" >}}

We can use the ports property to expose a container's port (private_port) and bind it to the host (public_port). The when property allows us to conditionally expose and bind that port when some prior condition is satisfied. Use the interface property to force the public port to be bound on a specific network interface. The public_port property is optional as of {{< version version="2.8.0" >}} allowing a port to be exposed but not bound.

```yaml
    ports:
    - private_port: "80"
      public_port: "80"
      port_type: tcp
      when: '{{repl ConfigOptionEquals "http_enabled" "1" }}'
    - private_port: "443"
      public_port: "443"
      interface: eth0
      port_type: tcp
      when: '{{repl ConfigOptionEquals "https_enabled" "1" }}'
```

{{< linked_headline "Volumes" >}}

We can also specify volumes that will be mounted.

Volumes are required for any persistent data created by your application. If you have data in a container that needs to be available to new versions of your app, or data that should be backed up then you will define a volume to store it. Volumes are also useful for services that require a fast filesystem such as database or cache applications.

You need to specify only the `host_path` and `container_path` of the volume. When new versions of your container are deployed, the volume will be mounted in the updated container.

Named Volumes: You may create a "named" volume by providing a host_path without a leading "/" (ex. `host_path: dbdata`) which becomes the name of the volume. On creation, named volumes will link the information inside the container_path into the host_path location and will act as a shared folder between your host and your docker container. Only folders can be named volumes.

Host Volumes: If you would like to have the volume mounted at a specific location on the host then you will provide a host_path value with a leading "/" (ex. `host_path: /dbdata`). Host volumes will bind-mount the host_path contents into the container_path location and will act as a shared mount between your host and your docker container. Folders or files can be bind-mounted host volumes.

Required properties:

- `host_path` For named volumes, this is the volume name (ex. dbdata). For host volumes, this is the absolute host location for the volume (ex. /dbdata).
- `container_path` The absolute location inside the container the volume will bind to (ex. /var/lib/mysql).

Optional properties:

- `permission` should be a octal permission string.
- `owner` should be the uid of the user inside the container.
- `options` {{< version version="2.3.0" >}} optional volume settings in an array of strings, a "ro" entry puts the volume into read-only mode.
- `is_ephemeral` {{< version version="2.3.5" >}} Ephemeral volumes do not prevent containers from being re-allocated across nodes. Ephemeral volumes will also be excluded from snapshots.
- `is_excluded_from_backup` exclude this volume from backup if Snapshots enabled.

```yaml
    volumes:
    - host_path: /dbdata
      container_path: /var/lib/mysql
      permission: "0755"
      owner: "100"
      is_ephemeral: false
      is_excluded_from_backup: true
      options: ["rw"]
```

Replicated supports volumes_from to attach several mounts from a colocated container.

```yaml
  - source: public
    ...
    name: datastore
    publish_events:
    - name: Datastore started
      trigger: port-listen
      data: '6379'
      subscriptions:
      - component: DBs
        container: alpine
        action: start
  - source: public
    image_name: alpine
    version: 3
    ephemeral: true
    cmd: '["migrate_data.sh"]'
    volumes_from: ["datastore"]
```

The container using "volumes_from" must start after any containers it mounts from.  Property "volumes_from" takes an array of strings where each string identifies a named container running on the same server.

{{< linked_headline "Logs" >}}

We can configure logs for containers by specifying the max number of logs files and the max size of the log files. The max size string should include
the size, k for kilobytes, m for megabytes or g for gigabytes. Log settings at the component level are inherited by the container and will be
used unless overwritten.

```yaml
components:
  - name: sample-agent
    logs:
      max_size: 200k
      max_files: 2
    containers:
      - source: replicated
        logs:
          max_size: 500k
          max_files: 5
```

{{< linked_headline "Restart Policies" >}}

Optionally, containers can be configured to be restarted automatically. Currently supported restart policies match those supported natively by Docker.
If the policy is not specified, the container will never be restarted. This behavior is equivalent to this setting:

### Never restart
```yaml
  restart:
    policy: never
```
Specifying the following policy will always restart the container regardless of the exit code.

### Always restart
```yaml
  restart:
    policy: always
```
Specifying the following policy will cause the container to be restarted with it terminates with an error. The max parameter is optional. If omitted, the
container will be restarted indefinitely.

### Restart on error only
```yaml
  restart:
    policy: on-failure
    max: 1000
```
Please refer to our Examples page for additional component configuration examples.



{{< linked_headline "Config Files" >}}

Your application may have config files that require dynamic values. These values may be input by the person installing the software, values
specific to the environment your application is running in, values created by other containers or read from the embedded license via the
License API. To accomplish this, Replicated allows templatizing of its config values using the Go template language with a repl escape
sequence. When your application runs, Replicated will process the templates, and you have full access to the the Replicated template library.

{{< linked_headline "Customer Files" >}}

Sometimes it can be helpful to allow a customer to supply a file to your app. A good example of this is when your customer should supply an
SSL certificate and private key. To add customer supplied files to your container, you must first define the file as a config option, and
then create a link to it in any container that needs that file. Replicated will prompt for the file to be uploaded and will ensure that the
file is at the correct location in the container when it is started.

{{< linked_headline "Environment Variables" >}}

The 12-factor app encourages the use of environment variables for configuration, and Replicated supports this design pattern. You can specify
environment variables, which will be injected into a container when it's created.

Environment variables can be created with static values or customer supplied values.

Environment variables support the Replicated template library.

{{< linked_headline "Exposed Ports" >}}

All ports listed in the Dockerfile with the EXPOSE directive will be automatically exposed when started. The Docker runtime will choose a
random port, ensuring that there are no conflicts. If you need to specify a specific public (host) port, you can list it here.

Common examples of when it is necessary to list an exposed port are for web server containers, or servers which have clients that are incapable
of discovering dynamic port mappings.

Port mappings support the Replicated template library.

{{< linked_headline "Startup" >}}

The startup section of a container allows you to specify the CMD value that will be passed to your container when it's started. It's generally
good to end your Dockerfile with an ENTRYPOINT command. If you specify a value for the CMD, it will be passed as parameters to the your ENTRYPOINT.

As with all inputs to containers, you have full access to the Replicated template library when creating a CMD value.

{{< linked_headline "Docker Options" >}}

You may also limit the resources used by your containers with the memory, cpushares and network modes and further secure your containers with security options

### Memory and Swap Limit
The amount of memory or swap for your container.  The format is number|unit where unit may be one of b, k, m or g.  By default there is no memory or swap limit and your container can use as much as needed.  You can learn more at [User Memory Constraints documentation](https://docs.docker.com/engine/reference/run/#/user-memory-constraints).
```yaml
  memory_limit: 500m
  memory_swap_limit: 1g
```

### CPU Shares
Using CPU shares you can change the access to the servers CPU at busy times.  When non CPU-intensive processes are other containers may use extra CPU time.  The default is 1024 and by increasing or decreasing the value on a container you change how the weighted CPU access is granted across all running containers.  You can learn more at [CPU Share Constraints documentation](https://docs.docker.com/engine/reference/run/#/cpu-share-constraint).
```yaml
  cpu_shares: 2048
```

### Network Mode
Network mode supports bridge, host, container or none.  Learn more about Docker's network modes at [Network Settings](https://docs.docker.com/engine/reference/run/#/network-settings).
```yaml
  network_mode: host
```

### Security Options
With security options you can use Docker security with existing well know systems such as apparmor.
```yaml
  security_options:
  - apparmor=unconfined
```

When specifying your security options you can use template functions and any blank security option is allowed and will be filtered out by Replicated.
```yaml
  security_options:
    - '{{repl if ConfigOptionEquals "enable_unconfined_apparmor_profile" "1"}}apparmor=unconfined{{repl end}}'
```

Learn more about Docker's [security configuration](https://docs.docker.com/engine/reference/run/#/security-configuration).

### Privileged Mode and Security Capability
Security capabilities and access to devices are limited for containers by default, however you can add security capabilities with the privileged and security_cap_add option.
```yaml
    privileged: true
    security_cap_add:
    - SYS_MODULE
```

Learn more about [Security Capabilities](https://docs.docker.com/engine/reference/run/#/runtime-privilege-and-linux-capabilities).

### Allocate TTY
For interactive processes you can allocate a TTYL with allocate_tty.  Learn more by reading about container process [Foreground](https://docs.docker.com/engine/reference/run/#/foreground).
```yaml
  allocate_tty: true
```

### Hostname
Sets the hostname inside of the container.  See the network host section under [Network settings](https://docs.docker.com/engine/reference/run/#/network-settings).
```yaml
  hostname: anxiety-closet
```

### Extra Hosts
Add extra hostname mappings with hostname, address and an optional when field.  See [extra_hosts](https://docs.docker.com/compose/compose-file/#extrahosts).
```yaml
  extra_hosts:
  - hostname: mysql
    address: 10.0.1.16
  - hostname: redis
    address: 10.0.1.32
```

### Named Containers
The name argument sets the name of your running container. It is provided as a convenience method during development when you may want to connect to your containers and view logs. References to the container in template functions should continue to the use image name.  Do not use on containers which run concurrently as the second container will fail to start due to a name conflict.

```yaml
  name: redis
```

For more information see [named containers](https://docs.docker.com/engine/reference/run/#/container-identification).

### Entrypoint
When working with third party containers you may want to override the default entry point using the
entrypoint option.
Learn more about [overriding entrypoints](https://docs.docker.com/engine/reference/builder/#/entrypoint) and how the
[cmd and entrypoint options](https://docs.docker.com/engine/reference/builder/#/understand-how-cmd-and-entrypoint-interact) work together.  Entrypoint takes an array of strings.

```yaml
    entrypoint: ["redis", "-p", "6380"]
```

### Ulimits
{{< version version="2.5.0" >}} Since setting ulimit settings in a container requires extra privileges not available in the default container, you can set these using the ulimits property of the container. Learn more about ulimits [here](https://docs.docker.com/engine/reference/commandline/run/#/set-ulimits-in-container---ulimit).

```yaml
    ulimits:
    - name: nofile
      soft: 1024
      hard: 1024
```

### Pid Mode

{{< version version="2.1.0" >}} Pid mode lets you specify the process namespace for your container. By default each container has its own space and by declaring a `pid_mode` you can see the processes of another container or host. See [PID settings](https://docs.docker.com/engine/reference/run/#pid-settings---pid) to learn more.

```yaml
    pid_mode: host
```
