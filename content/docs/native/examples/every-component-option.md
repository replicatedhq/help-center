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
      - allocate_tty: string
        cluster: true
        cluster_instance_count:
          initial: 4
          max: 20
          threshold_degraded: 2
          threshold_healthy: 3
        cmd: '["run-worker"]'
        config_files:
          - contents: string
            file_mode: string
            file_owner: string
            filename: string
            owner: string
            path: string
            ref: string
            repo: string
            source: string
        cpu_shares: string
        customer_files:
          - file_mode: string
            file_owner: string
            filename: string
            name: string
            when: string/boolean
        display_name: string
        dynamic: string/boolean
        entrypoint: [string]
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
        hostname: string
        extra_hosts:
          - address: string
            hostname: string
            when: true
          - address: '{{repl ConfigOption "extraHostAddress" "" }}'
            hostname: '{{repl ConfigOption "extraHostName" "" }}'
            when: '{{repl ConfigOptionNotEquals "extraHostAddress" "" }}'
        image_name: worker
        labels:
          - "key=value"
          - "key2"
          - '{{repl ConfigOption "workerLabel"}}'
        logs:
          max_files: "3"
          max_size: "10m"
        memory_limit: string
        memory_swap_limit: string
        name: string
        network_mode: string
        pid_mode: string
        ports:
          - interface: "docker0"
            port_type:
            private_port:
            public_port:
            when:
        privileged: true
        restart:
          max: 5
          policy: unless-stopped
        security_cap_add:
          - string
        security_options:
          - string
        shm_size: 1073741824
        source: replicated
        support_commands:
          - command: ["run-command" "-a"]
            filename: /tmp/run-command.out
        support_files:
          - filename: /var/application-data
        suppress_restart:
          - string
        ulimits:
          - hard: string
            name: string
            soft: string
        version: "1.1.0"
        volumes:
          - container_path: /mnt-path
            host_path: '{{repl ConfigOption "hostPath" }}'
            is_ephemeral: false
            is_excluded_from_backup: false
            options:
              - string
            owner: root
            permission: rwx
        volumes_from:
          - string
        when: true

      - source: replicated
        image_name: startup
        version: 1.0.1
        ephemeral: true
        publish_events:
        - name: startup container started
          trigger: container-start
          data: ""
          subscriptions:
          - component: worker
            container: worker
            action: start
```
