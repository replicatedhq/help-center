---
date: "2016-07-03T04:02:20Z"
title: "Docker Options"
description: "Advanced Docker Options in the Replicated Native Scheduler"
weight: "206"
categories: [ "Packaging a Native Application" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
---

{{< linked_headline "Docker Options" >}}

You may also limit the resources used by your containers with the memory, cpushares and network modes and further secure your containers with security options

{{< linked_headline "Memory and Swap Limit" >}}

The amount of memory or swap in bytes for your container.  By default there is no memory or swap limit and your container can use as much as needed.  You can learn more at [User Memory Constraints documentation](https://docs.docker.com/engine/reference/run/#/user-memory-constraints).

```yaml
  memory_limit: 500000000
  memory_swap_limit: 1000000000
```

{{< linked_headline "OOM Kill Disable" >}}

By default, the kernel kills processes in a container if an out-of-memory (OOM) error occurs. Only disable the OOM killer on containers where you have also set the `memory_limit` option. If memory limit is not set, this can result in the host running out of memory and require killing the host's system processes to free memory, which is likely to cause system instability.

```yaml
    oom_kill_disable: true
```

{{< linked_headline "CPU Shares" >}}

Using CPU shares you can change the access to the servers CPU at busy times.  When non CPU-intensive processes are other containers may use extra CPU time.  The default is 1024 and by increasing or decreasing the value on a container you change how the weighted CPU access is granted across all running containers.  You can learn more at [CPU Share Constraints documentation](https://docs.docker.com/engine/reference/run/#/cpu-share-constraint).

```yaml
  cpu_shares: 2048
```

{{< linked_headline "Network Mode" >}}

Network mode supports `bridge`, `host`, `container` or `none`.
Learn more about Docker's network modes at [Network Settings](https://docs.docker.com/engine/reference/run/#/network-settings).

```yaml
  network_mode: host
```


{{< linked_headline "Network" >}}

Connect a container to a network.
In addition to `bridge`, `host` and `none`, the `network` property supports specifying a network name or id to connect to an existing user-defined network.
Learn more about Docker's network settings at [Network Settings](https://docs.docker.com/engine/reference/run/#/network-settings).

```yaml
    network: user-net
```

{{< linked_headline "Network Aliases" >}}

Add network-scoped alias for the container.
Learn more about Docker's network settings at [Network Settings](https://docs.docker.com/engine/reference/run/#/network-settings).

```yaml
    network_aliases: ["my-service"]
```


{{< linked_headline "Security Options" >}}

With security options you can use Docker security with existing well know systems such as AppArmor.

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

{{< linked_headline "Privileged Mode and Security Capability" >}}

Security capabilities and access to devices are limited for containers by default, however you can add security capabilities with the privileged and security_cap_add option.

```yaml
    privileged: true
    security_cap_add:
    - SYS_MODULE
```

Learn more about [Security Capabilities](https://docs.docker.com/engine/reference/run/#/runtime-privilege-and-linux-capabilities).

{{< linked_headline "Allocate TTY">}}

For interactive processes you can allocate a TTYL with allocate_tty.  Learn more by reading about container process [Foreground](https://docs.docker.com/engine/reference/run/#/foreground).

```yaml
  allocate_tty: true
```

{{< linked_headline "Hostname" >}}

Sets the hostname inside of the container.  See the network host section under [Network settings](https://docs.docker.com/engine/reference/run/#/network-settings).

```yaml
  hostname: anxiety-closet
```

{{< linked_headline "Extra Hosts" >}}

Add extra hostname mappings with hostname, address and an optional when field.  See [extra_hosts](https://docs.docker.com/compose/compose-file/#extrahosts).

```yaml
  extra_hosts:
  - hostname: mysql
    address: 10.0.1.16
  - hostname: redis
    address: 10.0.1.32
```

{{< linked_headline "Named Containers" >}}

The name argument sets the name of your running container. It is provided as a convenience method during development when you may want to connect to your containers and view logs. References to the container in template functions should continue to the use image name.  Do not use on containers which run concurrently as the second container will fail to start due to a name conflict.

```yaml
  name: redis
```

For more information see [named containers](https://docs.docker.com/engine/reference/run/#/container-identification).

{{< linked_headline "Entrypoint" >}}

When working with third party containers you may want to override the default entry point using the entrypoint option.
Learn more about [overriding entrypoints](https://docs.docker.com/engine/reference/builder/#/entrypoint) and how the [cmd and entrypoint options](https://docs.docker.com/engine/reference/builder/#/understand-how-cmd-and-entrypoint-interact) work together.  Entrypoint takes an array of strings.

```yaml
    entrypoint: ["redis", "-p", "6380"]
```

{{< linked_headline "Ulimits" >}}

Since setting ulimit settings in a container requires extra privileges not available in the default container, you can set these using the ulimits property of the container. Learn more about ulimits [here](https://docs.docker.com/engine/reference/commandline/run/#/set-ulimits-in-container---ulimit).

```yaml
    ulimits:
    - name: nofile
      soft: 1024
      hard: 1024
```

{{< linked_headline "Pid Mode" >}}

Pid mode lets you specify the process namespace for your container. By default each container has its own space and by declaring a `pid_mode` you can see the processes of another container or host. See [PID settings](https://docs.docker.com/engine/reference/run/#pid-settings---pid) to learn more.

```yaml
    pid_mode: host
```

{{< linked_headline "Shm-Size" >}}

{{< version version="2.15.0" >}} Shm-Size lets you specify the size of `/dev/shm` for your container in bytes. If omitted or 0, the system defaults to 64MB.

```yaml
    shm_size: 67108864
```

{{< linked_headline "Ephemeral" >}}

Ephemeral marks that a container is expected to exit, and allows the scheduler to listen for the container to stop. One common scenario where this is required is running database migrations at startup.

```yaml
    ephemeral: true
```

{{< linked_headline "Dynamic" >}}

Dynamic marks that a container's image should always be pulled, whether it is initially used by the application or not. This can be used to prepare images for containers that your application might run dynamically or for containers where running depends on template functions that may change during startup.

```yaml
    dynamic: true
```

Marking an image as dynamic will pull the image and start the container. To pull the image without starting the container, add the `when: false` field to the container's options.

{{< linked_headline "Labels" >}}

[Labels](https://docs.docker.com/config/labels-custom-metadata/) can be applied to a container by Replicated. Labels are templateable, and will be split on the first `=` to form the label key and value. If no `=` is present, the entire string will become the key and the value will be the empty string.

For example, `my.container.label` would become a label with a key of `my.container.label` and an empty value while `my.container.value=IMPORTANT=FALSE` would have a key of `my.container.value` and a value of `IMPORTANT=FALSE`.

```yaml
    labels:
      - my.container.label
      - my.container.value=IMPORTANT=FALSE
      - 'my.template.value={{repl ConfigOption "labelValue" }}'
```

{{< linked_headline "Disable Publish All Ports" >}}

By default, Replicated will bind each exposed port to a random port on the host. Use this option to disable publishing all the ports to the host interfaces.

```yaml
    disable_publish_all_ports: true
```

{{< linked_headline "Stop Timeout" >}}

Stop Timeout is used to specify the number of seconds to wait after stopping an application container before killing it. By default this value is set to 10.

```yaml
    stop_timeout: 10
```

{{< linked_headline "Logs" >}}

We can configure logs for containers by specifying the max number of logs files and the max size of the log files.
This will configure log options only if "json-file" is the configured [Docker logging driver](https://docs.docker.com/config/containers/logging/configure/).
The max size string should include the size, k for kilobytes, m for megabytes or g for gigabytes.
Log settings at the component level are inherited by the container and will be used unless overridden.

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

For more advanced usage, it is possible to specify the `log_config` property of the component or container.
Type is the logging driver name and config is a set of key-value pairs for configuring log-opts.
For more details on configuring the logging driver, see the [Configure logging drivers](https://docs.docker.com/config/containers/logging/configure/) documentation.
When specified, this will override configuration set in the `logs` property.
Log config at the component level is inherited by the container and will be used unless overridden.

```yaml
components:
  - name: sample-agent
    log_config:
      type: journald
      config:
        tag: sample-agent
    containers:
      - source: replicated
        log_config:
          type: journald
          config:
            tag: sample-agent
```
