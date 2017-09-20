---
date: "2016-07-03T04:02:20Z"
title: "Support Bundle"
description: "Installed instances can generate a support bundle with relevant logs and instance information."
weight: "211"
categories: [ "Packaging an Application" ]
tags: [ "Support", "Application YAML" ]
index: "docs"
---

A support bundle is an archive that is available for the customer to download via the Support tab of the On-Prem Console.

Contents of the support page can be customized by including markdown in the top-level of the YAML.

```yaml
replicated_api_version: "{{< replicated_api_version_current >}}"
name: ELK
console_support_markdown: |
  # Email Us for help:
  #### support@getelk.com
  Or don't, your loss.
```

The support bundle has a default timeout of 120 seconds, after which only files and commands that have completed will be included in the downloaded bundle. A custom timeout in seconds can be specified in the `support` section of the yaml.

```yaml
support:
  timeout: 300
```

{{< linked_headline "Custom Files and Commands" >}}

In addition to the [default support files](/docs/packaging-an-application/support-bundle/#default-support-files) included in the support bundle, addtional files can be added via the `support` section of your yaml. Files from within the application’s containers can be included, as well as output of commands executed in the container. Support files and commands are supported by both the native and kubernetes schedulers. For more complex support commands it is possible to create a [config file](/docs/packaging-an-application/components-and-containers/#config-files) and execute that file from a support command. These files will be available withing the */scheduler* directory of the support bundle.

```yaml
support:
  files:
    - filename: /var/log/nginx/access.log
      source:
        replicated:
          component: Nginx
          container: my-nginx
        kubernetes:
          selector:
            run: my-nginx
  commands:
    - filename: access_last_1000.log
      command: [tail, -n1000, /var/log/nginx/access.log]
      source:
        replicated:
          component: Nginx
          container: my-nginx
        kubernetes:
          selector:
            run: my-nginx
```

{{< linked_headline "Default Support Files" >}}

By default the support bundle will include the following files:

| File | Description |
|------|-------------|
| /daemon/auditlogs/* | Audit log events. |
| /daemon/commands/date | Result of the command `date`. Print the system date and time. |
| /daemon/commands/df | Result of the command `df -al`. Report file system disk space usage for the local file systems. |
| /daemon/commands/df_inodes | Result of the command `df -ali`. Report file system inode usage for the local file systems. |
| /daemon/commands/dmesg | Result of the command `dmesg`. Print the kernel ring buffer. |
| /daemon/commands/free | Result of the command `free -m`. Display amount of free and used memory in the system. |
| /daemon/commands/hostname | Result of the command `hostname`. Show the system's host name. |
| /daemon/commands/ip_addr_show | Result of the command `ip -o addr show`. Show protocol (IP or IPv6) addresses on a device. |
| /daemon/commands/ip_link_show | Result of the command `ip -o link show`. Show network devices. |
| /daemon/commands/ip_route_show | Result of the command `ip -o route show`. Show routing table entries. |
| /daemon/commands/ps | Result of the command `ps fauxwww`. Report a snapshot of the current processes. |
| /daemon/commands/uptime | Result of the command `uptime`. Tell how long the system has been running. |
| /daemon/docker/docker_info.json | Display system-wide information. |
| /daemon/docker/docker_ps_a.json | Result of the command `docker ps -a`. List all containers. |
| /daemon/etc/centos-release | A copy of the `/etc/centos-release` file. Contain operating system identification data for centos distribution. |
| /daemon/etc/default/docker | A copy of the `/etc/default/docker` file. Upstart docker configuration. |
| /daemon/etc/default/replicated | A copy of the `/etc/default/replicated` file. Upstart replicated configuration. |
| /daemon/etc/default/replicated-operator | A copy of the `/etc/default/replicated-operator` file. Upstart replicated-operator configuration. |
| /daemon/etc/hostname | A copy of the `/etc/hostname` file. The system's host name. |
| /daemon/etc/hosts | A copy of the `/etc/hosts` file. Static table lookup for hostnames. |
| /daemon/etc/os-release | A copy of the `/etc/os-release` file. Contain operating system identification data. |
| /daemon/etc/replicated.conf | A copy of the `/etc/replicated.conf` file. Replicated legacy 1.x configuration. |
| /daemon/etc/sysconfig/docker | A copy of the `/etc/sysconfig/docker` file. Legacy systemd docker configuration. |
| /daemon/etc/sysconfig/replicated | A copy of the `/etc/sysconfig/replicated` file. Systemd replicated configuration. |
| /daemon/etc/sysconfig/replicated-operator | A copy of the `/etc/sysconfig/replicated-operator` file. Systemd replicated-operator configuration. |
| /daemon/etc/system-release | A copy of the `/etc/system-release` file. Contain operating system identification data. |
| /daemon/etc/systemd/system/docker.service.d/http-proxy.conf | A copy of the `/etc/systemd/system/docker.service.d/http-proxy.conf` file. Systemd docker proxy configuration. |
| /daemon/etc/timezone | A copy of the `/etc/timezone` file. The system's timezone. |
| /daemon/journald/replicated.log | Result of the command `journalctl -u replicated` file. Journald replicated logs. |
| /daemon/journald/replicated-operator.log | Result of the command `journalctl -u replicated-operator` file. Journald replicated-operator logs. |
| /daemon/journald/replicated-ui.log | Result of the command `journalctl -u replicated-ui` file. Journald replicated-ui logs. |
| /daemon/proc/cpuinfo | A copy of the `/proc/cpuinfo` file. Information about the processor, such as its type, make, model, and performance. |
| /daemon/proc/meminfo | A copy of the `/proc/meminfo` file. Information about memory usage, both physical and swap. |
| /daemon/proc/mounts | A copy of the `/proc/mounts` file. Mounted filesystems. |
| /daemon/proc/uptime | A copy of the `/proc/uptime` file. The time the system has been up. |
| /daemon/proc/version | A copy of the `/proc/version` file. The kernel version. |
| /daemon/proc/vmstat | A copy of the `/proc/vmstat` file. Detailed virtual memory statistics from the kernel. |
| /daemon/replicated/config-commands.txt | A list of all configuration test commands that were run and the results. |
| /daemon/replicated/daemon.json | Daemon properties and runtime configuration. |
| /daemon/replicated/ledis-app.dump | A dump of the Replicated database. |
| /daemon/replicated/ledis-registry.dump | A dump of the Replicated registry database. |
| /daemon/replicated/params.json | Daemon runtime configuration. |
| /daemon/replicated/replicated-inspect.json | Result of the command `docker inspect replicated`. Return low-level information on the replicated container. |
| /daemon/replicated/replicated-operator-inspect.json | Result of the command `docker inspect replicated-operator`. Return low-level information on the replicated-operator container. |
| /daemon/replicated/replicated-operator.log | Result of the command `docker logs replicated-operator --tail 10000`. Docker replicated-operator container logs. |
| /daemon/replicated/replicated-ui-inspect.json | Result of the command `docker inspect replicated-ui`. Return low-level information on the replicated-ui container. |
| /daemon/replicated/replicated-ui.log | Result of the command `docker logs replicated-ui --tail 10000`. Docker replicated-ui container logs. |
| /daemon/replicated/replicated-versions.txt | A list of all running replicated components and their versions. |
| /daemon/replicated/replicated.log | Result of the command `docker logs replicated --tail 10000`. Docker replicated container logs. |
| /daemon/replicated/runtime/goroutines.txt | Stack traces of all current goroutines. |
| /daemon/replicated/tasks.txt | A list of all current tasks: queued, executing, or sleeping. |
| /daemon/var/log/upstart/docker.log | A copy of the `/var/log/upstart/docker.log` file. Upstart docker logs. |
| /daemon/var/log/upstart/replicated-operator.log | A copy of the `/var/log/upstart/replicated-operator.log` file. Upstart replicated-operator logs. |
| /daemon/var/log/upstart/replicated-ui.log | A copy of the `/var/log/upstart/replicated-ui.log` file. Upstart replicated-ui logs. |
| /daemon/var/log/upstart/replicated.log | A copy of the `/var/log/upstart/replicated.log` file. Upstart replicated logs. |
| /scheduler/container/*&lt;container_id&gt;*/inspect | Result of the command `docker inspect <container_id>`. Displays low-level information on a Docker container. |
| /scheduler/container/*&lt;container_id&gt;*/stdout.log | Result of the command `docker logs <container_id>`. Docker container logs stdout. |
| /scheduler/container/*&lt;container_id&gt;*/stderr.log | Result of the command `docker logs <container_id>`. Docker container logs stderr. |
| /scheduler/container/*&lt;container_id&gt;*/files/* | Contains any custom container files as specified by the vendor application. |
| /scheduler/container/*&lt;container_id&gt;*/commands/* | Contains any custom container commands as specified by the vendor application. |
| /scheduler/node/*&lt;node_id&gt;*/commands/date | Result of the command `date`. Print the system date and time. |
| /scheduler/node/*&lt;node_id&gt;*/commands/df | Result of the command `df -al`. Report file system disk space usage for the local file systems. |
| /scheduler/node/*&lt;node_id&gt;*/commands/df_inodes | Result of the command `df -ali`. Report file system inode usage for the local file systems. |
| /scheduler/node/*&lt;node_id&gt;*/commands/dmesg | Result of the command `dmesg`. Print the kernel ring buffer. |
| /scheduler/node/*&lt;node_id&gt;*/commands/free | Result of the command `free -m`. Display amount of free and used memory in the system. |
| /scheduler/node/*&lt;node_id&gt;*/commands/hostname | Result of the command `hostname`. Show the system's host name. |
| /scheduler/node/*&lt;node_id&gt;*/commands/ip_addr_show | Result of the command `ip -o addr show`. Show protocol (IP or IPv6) addresses on a device. |
| /scheduler/node/*&lt;node_id&gt;*/commands/ip_link_show | Result of the command `ip -o link show`. Show network devices. |
| /scheduler/node/*&lt;node_id&gt;*/commands/ip_route_show | Result of the command `ip -o route show`. Show routing table entries. |
| /scheduler/node/*&lt;node_id&gt;*/commands/ps | Result of the command `ps fauxwww`. Report a snapshot of the current processes. |
| /scheduler/node/*&lt;node_id&gt;*/commands/uptime | Result of the command `uptime`. Tell how long the system has been running. |
| /scheduler/node/*&lt;node_id&gt;*/docker/docker_info.json | Display system-wide information. |
| /scheduler/node/*&lt;node_id&gt;*/docker/docker_ps_a.json | Result of the command `docker ps -a`. List all containers. |
| /scheduler/node/*&lt;node_id&gt;*/etc/centos-release | A copy of the `/etc/centos-release` file. Contain operating system identification data for centos distribution. |
| /scheduler/node/*&lt;node_id&gt;*/etc/default/docker | A copy of the `/etc/default/docker` file. Upstart docker configuration. |
| /scheduler/node/*&lt;node_id&gt;*/etc/default/replicated | A copy of the `/etc/default/replicated` file. Upstart replicated configuration. |
| /scheduler/node/*&lt;node_id&gt;*/etc/default/replicated-operator | A copy of the `/etc/default/replicated-operator` file. Upstart replicated-operator configuration. |
| /scheduler/node/*&lt;node_id&gt;*/etc/hostname | A copy of the `/etc/hostname` file. The system's host name. |
| /scheduler/node/*&lt;node_id&gt;*/etc/hosts | A copy of the `/etc/hosts` file. Static table lookup for hostnames. |
| /scheduler/node/*&lt;node_id&gt;*/etc/os-release | A copy of the `/etc/os-release` file. Contain operating system identification data. |
| /scheduler/node/*&lt;node_id&gt;*/etc/replicated.conf | A copy of the `/etc/replicated.conf` file. Rplicated legacy 1.x configuration. |
| /scheduler/node/*&lt;node_id&gt;*/etc/sysconfig/docker | A copy of the `/etc/sysconfig/docker` file. Legacy systemd docker configuration. |
| /scheduler/node/*&lt;node_id&gt;*/etc/sysconfig/replicated | A copy of the `/etc/sysconfig/replicated` file. Systemd replicated configuration. |
| /scheduler/node/*&lt;node_id&gt;*/etc/sysconfig/replicated-operator | A copy of the `/etc/sysconfig/replicated-operator` file. Systemd replicated-operator configuration. |
| /scheduler/node/*&lt;node_id&gt;*/etc/system-release | A copy of the `/etc/system-release` file. Contain operating system identification data. |
| /scheduler/node/*&lt;node_id&gt;*/etc/systemd/system/docker.service.d/http-proxy.conf | A copy of the `/etc/systemd/system/docker.service.d/http-proxy.conf` file. Systemd docker proxy configuration. |
| /scheduler/node/*&lt;node_id&gt;*/etc/timezone | A copy of the `/etc/timezone` file. The system's timezone. |
| /scheduler/node/*&lt;node_id&gt;*/proc/cpuinfo | A copy of the `/proc/cpuinfo` file. Information about the processor, such as its type, make, model, and performance. |
| /scheduler/node/*&lt;node_id&gt;*/proc/meminfo | A copy of the `/proc/meminfo` file. Information about memory usage, both physical and swap. |
| /scheduler/node/*&lt;node_id&gt;*/proc/mounts | A copy of the `/proc/mounts` file. Mounted filesystems. |
| /scheduler/node/*&lt;node_id&gt;*/proc/uptime | A copy of the `/proc/uptime` file. The time the system has been up. |
| /scheduler/node/*&lt;node_id&gt;*/proc/version | A copy of the `/proc/version` file. The kernel version. |
| /scheduler/node/*&lt;node_id&gt;*/proc/vmstat | A copy of the `/proc/vmstat` file. Detailed virtual memory statistics from the kernel. |
| /scheduler/node/*&lt;node_id&gt;*/scheduler/params.json | Operator runtime configuration. |
| /scheduler/node/*&lt;node_id&gt;*/scheduler/replicated-operator-inspect.json | Result of the command `docker inspect replicated-operator`. Return low-level information on the replicated-operator container. |
| /scheduler/node/*&lt;node_id&gt;*/scheduler/replicated-operator.log | Result of the command `docker logs replicated-operator --tail 10000`. Docker replicated-operator container logs. |
| /scheduler/node/*&lt;node_id&gt;*/scheduler/runtime/goroutines.txt | Stack traces of all current goroutines. |
| /scheduler/node/*&lt;node_id&gt;*/scheduler/var/lib/replicated-operator/logs/* | Archived vendor application container logs. |
| /scheduler/node/*&lt;node_id&gt;*/scheduler/var/lib/replicated-operator/replicated-operator.conf | A copy of the `/var/lib/replicated-operator/replicated-operator.conf` file. Replicated operator generated configuration file. |
| /scheduler/node/*&lt;node_id&gt;*/var/log/upstart/docker.log | A copy of the `/var/log/upstart/docker.log` file. Upstart docker logs. |
| /scheduler/node/*&lt;node_id&gt;*/var/log/upstart/replicated-operator.log | A copy of the `/var/log/upstart/replicated-operator.log` file. Upstart replicated-operator logs. |
| /scheduler/node/*&lt;node_id&gt;*/var/log/upstart/replicated-ui.log | A copy of the `/var/log/upstart/replicated-ui.log` file. Upstart replicated-ui logs. |
| /scheduler/node/*&lt;node_id&gt;*/var/log/upstart/replicated.log | A copy of the `/var/log/upstart/replicated.log` file. Upstart replicated logs. |
| /scheduler/nodes.txt | A list of all scheduler nodes. |
