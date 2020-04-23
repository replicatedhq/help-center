---
date: "2016-07-03T04:02:20Z"
title: "Support Bundle"
description: "Configurating and using a support bundle from a Docker Swarm installation"
weight: "607"
categories: [ "Packaging a Swarm Application" ]
index: ["docs/swarm", "docs"]
icon: "replicatedDockerSwarm"
gradient: "swarm"
---

A support bundle is an archive that is available for the customer to download via the Support tab of the Admin Console or the [Replicated CLI](/api/replicatedctl/replicatedctl_support-bundle/).

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

{{< note title="Support Bundle 2.0" >}}
The remainder of this document is specific to the current default Support Bundle in Replicated. If you are looking for the v1 version of this document, it is available at <a href="/docs/swarm/packaging-an-application/support-bundle-v1/">{{< baseurl >}}/docs/swarm/packaging-an-application/support-bundle-v1/</a>
{{< /note >}}

In addition to the [default support files](/docs/swarm/packaging-an-application/support-bundle/#default-support-files) included in the support bundle, addtional files can be included by configuring a [custom troubleshoot spec](/docs/troubleshoot/server/collectors/overview) for the desired app channel.
This custom troubleshoot spec will be included with the default replicated specs when a support bundle is generated.


{{< linked_headline "Excluding Logs From Support Bundles" >}}

If a service's logs may contain sensitive information or are simply large and not useful for your debugging processes, you can exclude that service's logs from support bundles. To do this, add the label `com.replicated.excludelogs=true` to the service in question.

```yaml
services:
  private-worker:
    image: app
    labels:
      com.replicated.excludelogs: "true"
```

{{< linked_headline "Default Support Files" >}}

By default the Support Bundle will include the following files in the master folder:

| File | Description |
|------|-------------|
| /app/containers/\*.json | Vendor application low-level container information. Result of the command `docker inspect <container>` for containers on the master node |
| /app/logs/\*.stderr | Vendor application container stderr logs. Result of the command `docker logs <container>` for containers on the master node |
| /app/logs/\*.stdout | Vendor application container stdout logs. Result of the command `docker logs <container>` for containers on the master node |
| /default/commands/date/stdout | Print the system date and time. Result of the command `date` |
| /default/commands/df/stdout | Report file system disk space usage for the local file systems. Result of the command `df -al` |
| /default/commands/df_inodes/stdout | Report file system inode usage for the local file systems. Result of the command `df -ali` |
| /default/commands/dmesg/stdout | Print the kernel ring buffer. Result of the command `dmesg` |
| /default/commands/free/stdout | Display amount of free and used memory in the system. Result of the command `free -m` |
| /default/commands/hostname/stdout | Show the system's host name. Result of the command `hostname` |
| /default/commands/ip_addr_show/stdout | Show protocol (IP or IPv6) addresses on a device. Result of the command `ip -o addr show` |
| /default/commands/ip_link_show/stdout | Show network devices. Result of the command `ip -o link show` |
| /default/commands/ip_route_show/stdout | Show routing table entries. Result of the command `ip -o route show` |
| /default/commands/loadavg/stdout | Show system load average. Result of the command `loadavg` |
| /default/commands/ps/stdout | Report a snapshot of the current processes. Result of the command `ps fauxwww` |
| /default/commands/uptime/uptime | Tell how long the system has been running. Result of the command `uptime` |
| /default/docker/container_ls.json | List all containers. Result of the command `docker ps -a` |
| /default/docker/docker_info.json | Display system-wide information |
| /default/docker/docker_version.json | Docker version output |
| /default/docker/image_ls.json | List all images. Result of the command `docker images`|
| /default/etc/centos-release | Operating system identification data for centos distributions. A copy of the `/etc/centos-release` file. |
| /default/etc/default/docker | Upstart docker configuration. A copy of the `/etc/default/docker` file |
| /default/etc/fstab | The system's filesystems table. A copy of the `/etc/fstab` file |
| /default/etc/hostname | The system's host name. A copy of the `/etc/hostname` file |
| /default/etc/hosts | Static table lookup for hostnames. A copy of the `/etc/hosts` file |
| /default/etc/os-release | Operating system identification data. A copy of the `/etc/os-release` file. |
| /default/etc/sysconfig/docker | Systemd docker configuration. A copy of the `/etc/sysconfig/docker` file |
| /default/etc/system-release | Operating system identification data. A copy of the `/etc/system-release` file |
| /default/etc/systemd/system/docker.service.d/http-proxy.conf | Systemd docker proxy configuration. A copy of the `/etc/systemd/system/docker.service.d/http-proxy.conf` file |
| /default/etc/timezone | The system's timezone. A copy of the `/etc/timezone` file |
| /default/journald/docker/logs.raw | The Docker Journald logs |
| /default/os-release/os-release | Operating system identification data. A copy of the `/etc/os-release` file. |
| /default/proc/cpuinfo | Information about the processor, such as its type, make, model, and performance. A copy of the `/proc/cpuinfo` file |
| /default/proc/loadavg | The system load average. A copy of the `/proc/loadavg` file |
| /default/proc/meminfo | Information about memory usage, both physical and swap. A copy of the `/proc/meminfo` file |
| /default/proc/mounts | Mounted filesystems. A copy of the `/proc/mounts` file |
| /default/proc/uptime | The time the system has been up. A copy of the `/proc/uptime` file |
| /default/proc/version | The kernel version. A copy of the `/proc/version` file |
| /default/proc/vmstat | Detailed virtual memory statistics from the kernel. A copy of the `/proc/vmstat` file |
| /default/var/log/upstart/docker.log | Docker upstart logs when running with the upstart init system |
| /replicated/containers/inspect/\*.json | Replicated low-level container information. Result of the command `docker inspect <container>` |
| /replicated/etc/default/replicated | Replicated configuration file. A copy of the `/etc/default/replicated` file |
| /replicated/etc/default/replicated-operator | Replicated operator configuration file. A copy of the `/etc/default/replicated-operator` file |
| /replicated/etc/replicated.conf | Replicated configuration file. A copy of the `/etc/replicated.conf` file |
| /replicated/etc/sysconfig/replicated | Replicated configuration file. A copy of the `/etc/sysconfig/replicated` file |
| /replicated/etc/sysconfig/replicated-operator | Replicated operator configuration file. A copy of the `/etc/sysconfig/replicated-operator` file |
| /replicated/internal/app-config.json | Application configuration and values excluding passwords |
| /replicated/internal/app-releases.txt | Application releases list with installation time |
| /replicated/internal/audit_events.csv | Replicated audit log events dump |
| /replicated/internal/config-commands.txt | Replicated config command results |
| /replicated/internal/daemon.json | Replicated daemon information |
| /replicated/internal/goroutines.txt | Replicated thread dump |
| /replicated/internal/host-info.json | Replicated cluster host info |
| /replicated/internal/ledis-app.dump | Replicated main database dump |
| /replicated/internal/ledis-registry.dump | Replicated registry database dump |
| /replicated/internal/ledis-snapshots.dump | Replicated snapshots database dump |
| /replicated/internal/license.txt | Replicated license information |
| /replicated/internal/operators.json | A list of all operators |
| /replicated/internal/params.json | Replicated runtime configuration |
| /replicated/internal/replicated-versions.txt | Replicated version information |
| /replicated/internal/tasks.txt | Replicated current tasks (queued, executing, or sleeping) |
| /replicated/logs/\*.journald.log/logs.raw | Replicated journald logs when running with the systemd init system. Result of the command `journalctl -u <unit> -r` |
| /retraced/containers/\*.json | Docker inspect results for all Audit Log containers. Result of the command `docker inspect <container>` |
| /retraced/logs/\*.json | Docker logs for all Audit Log containers. Result of the command `docker logs <container>` |
| /scheduler/swarm/replicated/logs/\<task_id\>.stderr | The logs of all Replicated tasks |
| /scheduler/swarm/replicated/logs/\<service_name\>.stderr | The logs of all Replicated services |
| /scheduler/swarm/replicated/service_ls.json | The list of Replicated services. Equivalent to `docker service ls --filter label=com.docker.stack.namespace=replicated` |
| /scheduler/swarm/replicated/service_ps.json | The list of Replicated tasks. Equivalent to `docker service ps <servicename>` for all Replicated services |
| /scheduler/swarm/retraced/logs/\<task_id\>.stderr | The logs for all Audit Log tasks |
| /scheduler/swarm/retraced/logs/\<service_name\>.stderr | The logs for all Audit Log services |
| /scheduler/swarm/retraced/service_ls.json | The list of Audit Log services. Equivalent to `docker service ls --filter label=com.docker.stack.namespace=retraced` |
| /scheduler/swarm/retraced/service_ps.json | The list of Replicated tasks. Equivalent to `docker service ps <servicename>` for all Audit Log services |
| /scheduler/swarm/stack/logs/\<task_id\>.stderr | The stderr logs of all app tasks |
| /scheduler/swarm/stack/logs/\<task_id\>.stdout | The stdout logs of all app tasks |
| /scheduler/swarm/stack/logs/\<service_name\>.stderr | The stderr logs of all app services |
| /scheduler/swarm/stack/logs/\<service_name\>.stdout | The stdout logs of all app services  |
| /scheduler/swarm/stack/service_ls.json | The list of app services services. Equivalent to `docker service ls --filter label=com.docker.stack.namespace=<appnamespace>` |
| /scheduler/swarm/stack/service_ps.json | The list of Replicated tasks. Equivalent to `docker service ps <servicename>` for all app services |
| /scheduler/swarm/system/swarm-nodes/node_ls.json | The list of swarm nodes in the cluster. Equivalent to `docker node ls` |
| /scheduler/swarm/system/swarm-tasks/task_ls.json | The list of tasks in the cluster. Equivalent to `docker service ps <servicename>` for all services |
| /VERSION.json | Support-bundle command version information |

The master folder will also include any custom support bundle commands specified via Replicated Console, if that has
been enabled for this license via vendor web.

Support Bundle will also include a folder for each instance of Replicated Operator that is running, with the name being
the private IP of the instance. It will contain the following files:

| File | Description |
|------|-------------|
| /app/containers/\*.json | Vendor application low-level container information. Result of the command `docker inspect <container>` for containers on this node |
| /app/logs/\*.stderr | Vendor application container stderr logs. Result of the command `docker logs <container>` for containers on this node |
| /app/logs/\*.stdout | Vendor application container stdout logs. Result of the command `docker logs <container>` for containers on this node |
| /default/commands/date/stdout | Print the system date and time. Result of the command `date` |
| /default/commands/df/stdout | Report file system disk space usage for the local file systems. Result of the command `df -al` |
| /default/commands/df_inodes/stdout | Report file system inode usage for the local file systems. Result of the command `df -ali` |
| /default/commands/dmesg/stdout | Print the kernel ring buffer. Result of the command `dmesg` |
| /default/commands/free/stdout | Display amount of free and used memory in the system. Result of the command `free -m` |
| /default/commands/hostname/stdout | Show the system's host name. Result of the command `hostname` |
| /default/commands/ip_addr_show/stdout | Show protocol (IP or IPv6) addresses on a device. Result of the command `ip -o addr show` |
| /default/commands/ip_link_show/stdout | Show network devices. Result of the command `ip -o link show` |
| /default/commands/ip_route_show/stdout | Show routing table entries. Result of the command `ip -o route show` |
| /default/commands/ps/stdout | Report a snapshot of the current processes. Result of the command `ps fauxwww` |
| /default/commands/uptime/uptime | Tell how long the system has been running. Result of the command `uptime` |
| /default/docker/docker_info.json | Display system-wide information |
| /default/docker/docker_version.json | Docker version output |
| /default/docker/container_ls.json | List all containers. Result of the command `docker ps -a` |
| /default/etc/centos-release | Operating system identification data for centos distributions. A copy of the `/etc/centos-release` file. |
| /default/etc/default/docker | Upstart docker configuration. A copy of the `/etc/default/docker` file |
| /default/etc/hostname | The system's host name. A copy of the `/etc/hostname` file |
| /default/etc/hosts | Static table lookup for hostnames. A copy of the `/etc/hosts` file |
| /default/os-release/os-release | Operating system identification data. A copy of the `/etc/os-release` file. |
| /default/etc/sysconfig/docker | Systemd docker configuration. A copy of the `/etc/sysconfig/docker` file |
| /default/etc/system-release | Operating system identification data. A copy of the `/etc/system-release` file |
| /default/etc/systemd/system/docker.service.d/http-proxy.conf | Systemd docker proxy configuration. A copy of the `/etc/systemd/system/docker.service.d/http-proxy.conf` file |
| /default/etc/timezone | The system's timezone. A copy of the `/etc/timezone` file |
| /default/proc/cpuinfo | Information about the processor, such as its type, make, model, and performance. A copy of the `/proc/cpuinfo` file |
| /default/proc/loadavg | The system load average. A copy of the `/proc/loadavg` file |
| /default/proc/meminfo | Information about memory usage, both physical and swap. A copy of the `/proc/meminfo` file |
| /default/proc/mounts | Mounted filesystems. A copy of the `/proc/mounts` file |
| /default/proc/uptime | The time the system has been up. A copy of the `/proc/uptime` file |
| /default/proc/version | The kernel version. A copy of the `/proc/version` file |
| /default/proc/vmstat | Detailed virtual memory statistics from the kernel. A copy of the `/proc/vmstat` file |
| /default/var/log/upstart/docker.log | Docker upstart logs when running with the upstart init system |
| /replicated/logs/\*.journald.log/logs.raw | Replicated journald logs when running with the systemd init system. Result of the command `journalctl -u <unit> -r` |
| /replicated-operator/containers/\*.json | Docker inspect results for the Replicated Operator container. Result of the command `docker inspect <container>` |
| /replicated-operator/internal/goroutines.txt | Replicated Operator thread dump |
| /replicated-operator/internal/params.json | Replicated Operator runtime configuration |
| /replicated-operator/logs/\*.stderr | stderr logs for the Replicated Operator container |
| /VERSION.json | Support-bundle command version information |
