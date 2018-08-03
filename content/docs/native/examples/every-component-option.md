---
date: "2016-07-03T04:02:20Z"
title: "Every Component Option"
description: "A an example YAML with every possible component option."
weight: "404"
categories: [ "Replicated Scheduler Examples" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
---

## Every Component Option

This is an example YAML using every possible option on the native components specification.

```yaml
components:
  - name: worker
    tags: ["Worker"]
    conflicts: ["API"]
    cluster: true
    cluster_host_count:
      strategy: autoscale
      min: 1
      max: 10
      threshold_healthy: 2
      threshold_degraded: 1
    host_requirements:
      cpu_cores: 4
      cpu_mhz: 2000
      memory: 4GB
      disk_space: 10GB
    logs:
      max_size: "10m"
      max_files: "3"
    host_volumes:
      - host_path: /tmp/worker
        owner: "0"
        permission: "0600"
        is_ephemeral: "true"
        is_excluded_from_backup: "true"
        min_disk_space: 10GB

    containers:
      - allocate_tty: false
        cluster: true
        cluster_instance_count:
          initial: 4
          max: 20
          threshold_degraded: 2
          threshold_healthy: 3
        cmd: '["run-worker"]'
        config_files:
          - contents:
              server {
                listen       80;
                server_name  localhost;
                location / {
                  proxy_set_header X-Real-IP  $remote_addr;
                  proxy_set_header X-Forwarded-For $remote_addr;
                  proxy_set_header Host $host;
                  proxy_pass http://{{repl HostPrivateIpAddress "App" "wlaoh/counter" }}:{{repl ContainerExposedPort "App" "wlaoh/counter" "3000" }};
                }
              }
            filename: /etc/nginx/conf.d/default.conf

          - file_mode: "0444"
            file_owner: "0"
            filename: "/data/config.yml"
            source: github
            owner: my_github_org
            repo: my_github_repo
            path: path/to/config.yml
            ref: master
        cpu_shares: 1024
        customer_files:
          - file_mode: "0777"
            file_owner: "0"
            filename: "/data/otherconfig.yml"
            name: your_file_name
            when: true
        dynamic: false
        entrypoint: ["/bin/application"]
        env_vars:
          - is_excluded_from_support: false
            name: LOG_LEVEL
            value: INFO
            when: true
          - is_excluded_from_support: '{{repl ConfigOption "isKeySecret" }}'
            name: SERVER_KEY
            value: '{{repl ConfigOption "serverKey" }}'
            when: '{{repl ConfigOptionNotEquals "serverKey" "" }}'
        ephemeral: false
        hostname: server.replexample.int
        extra_hosts:
          - address: '{{repl ConfigOption "extraHostAddress" }}'
            hostname: '{{repl ConfigOption "extraHostName" }}'
            when: '{{repl ConfigOptionNotEquals "extraHostAddress" "" }}'
        image_name: worker
        labels:
          - "key=value"
          - "key2"
          - '{{repl ConfigOption "workerLabel"}}'
        logs:
          max_files: "3"
          max_size: "10m"
        memory_limit: 500m
        memory_swap_limit: 1g
        ports:
          - interface: "docker0"
            port_type: tcp
            private_port: 80
            when: true
        privileged: true
        restart:
          max: 5
          policy: on-failure
        security_cap_add:
          - SYS_MODULE
        security_options:
          - '{{repl if ConfigOptionEquals "enable_unconfined_apparmor_profile" "1"}}apparmor=unconfined{{repl end}}'
        shm_size: 1073741824
        source: replicated
        support_commands:
          - command: ["run-command","-a"]
            filename: /tmp/run-command.out
        support_files:
          - filename: /var/application-data
        ulimits:
          - name: nofile
            soft: 1024
            hard: 1024
        version: "1.1.0"
        volumes:
          - container_path: /mnt-path
            host_path: '{{repl ConfigOption "hostPath" }}'
            is_ephemeral: false
            is_excluded_from_backup: false
            options: ["ro"]
            owner: "0"
            permission: "0555"
        volumes_from:
          - startup
        when: true
      - source: replicated
        image_name: startup
        version: 1.0.1
        ephemeral: true
        name: startup
        network_mode: host
        pid_mode: host
        ports:
          - interface: "docker0"
            port_type: tcp
            private_port: 80
            public_port: 9009
            when: true
        publish_events:
        - name: startup container started
          trigger: port-listen
          data: "9009"
          subscriptions:
          - component: worker
            container: worker
            action: start
```
