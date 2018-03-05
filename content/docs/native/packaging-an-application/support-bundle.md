---
date: "2016-07-03T04:02:20Z"
title: "Support Bundle"
description: "Installed instances can generate a support bundle with relevant logs and instance information."
weight: "212"
categories: [ "Packaging a Native Application" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
aliases: [/docs/packaging-an-application/support-bundle/,/tags/support-bundle/]
---

A support bundle is an archive that is available for the customer to download via the Support tab of the On-Prem Console or the [Replicated CLI](/api/replicatedctl/replicatedctl_support-bundle/).

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

In addition to the [default support files](/docs/native/packaging-an-application/support-bundle/#default-support-files) included in the support bundle, additional files can be added via the `support` section of your yaml. Files from within the application’s containers can be included, as well as output of commands executed in the container. Support files and commands are supported by both the native and kubernetes schedulers. For more complex support commands it is possible to create a [config file](/docs/native/packaging-an-application/config-files) and execute that file from a support command. These files will be available within the _/scheduler_ directory of the support bundle.

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

{{< note title="Older Replicated Instances" >}}
The content in this document is specific to the current default Support Bundle in Replicated. If you are looking for the list of files included in previous releases of Replicated, it is available at <a href="/docs/native/packaging-an-application/support-bundle-v1/">{{< baseurl >}}native/packaging-an-application/support-bundle-v1/</a>
{{< /note >}}

By default the Support Bundle will include the following files:

| File                                                             | Description                                                                                                                                     |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| /app/container-logs/logs/\*.stdout.log.gz                        | Vendor application archival container stdout logs                                                                                               |
| /app/container-logs/logs/\*.stderr.log.gz                        | Vendor application archival container stderr logs                                                                                               |
| /app/containers/\*.json                                          | Vendor application low-level container information. Result of the command `docker inspect <container>`                                          |
| /app/custom/:component/commands/:filename.stdout                 | [Custom support commands](/docs/native/packaging-an-application/support-bundle/#custom-files-and-commands) stdout as defined by the vendor application |
| /app/custom/:component/commands/:filename.stderr                 | [Custom support commands](/docs/native/packaging-an-application/support-bundle/#custom-files-and-commands) stderr as defined by the vendor application |
| /app/custom/:component/:filename                                 | [Custom support files](/docs/native/packaging-an-application/support-bundle/#custom-files-and-commands) as defined by the vendor application           |
| /app/logs/\*.log                                                 | Vendor application container logs. Result of the command `docker logs <container>`                                                              |
| /default/commands/date                                           | Print the system date and time. Result of the command `date`                                                                                    |
| /default/commands/df                                             | Report file system disk space usage for the local file systems. Result of the command `df -al`                                                  |
| /default/commands/df_inodes                                      | Report file system inode usage for the local file systems. Result of the command `df -ali`                                                      |
| /default/commands/dmesg                                          | Print the kernel ring buffer. Result of the command `dmesg`                                                                                     |
| /default/commands/free                                           | Display amount of free and used memory in the system. Result of the command `free -m`                                                           |
| /default/commands/hostname                                       | Show the system's host name. Result of the command `hostname`                                                                                   |
| /default/commands/ip_addr_show                                   | Show protocol (IP or IPv6) addresses on a device. Result of the command `ip -o addr show`                                                       |
| /default/commands/ip_link_show                                   | Show network devices. Result of the command `ip -o link show`                                                                                   |
| /default/commands/ip_route_show                                  | Show routing table entries. Result of the command `ip -o route show`                                                                            |
| /default/commands/ps                                             | Report a snapshot of the current processes. Result of the command `ps fauxwww`                                                                  |
| /default/commands/uptime                                         | Tell how long the system has been running. Result of the command `uptime`                                                                       |
| /default/docker/docker_images_all.json                           | List all Docker images. Result of the command `docker images -a`                                                                                |
| /default/docker/docker_info.json                                 | Display system-wide information                                                                                                                 |
| /default/docker/docker_ps_all.json                               | List all containers. Result of the command `docker ps -a`                                                                                       |
| /default/etc/centos-release                                      | Operating system identification data for centos distributions. A copy of the `/etc/centos-release` file.                                        |
| /default/etc/default/docker                                      | Upstart docker configuration. A copy of the `/etc/default/docker` file                                                                          |
| /default/etc/hostname                                            | The system's host name. A copy of the `/etc/hostname` file                                                                                      |
| /default/etc/hosts                                               | Static table lookup for hostnames. A copy of the `/etc/hosts` file                                                                              |
| /default/etc/os-release                                          | Operating system identification data. A copy of the `/etc/os-release` file.                                                                     |
| /default/etc/sysconfig/docker                                    | Systemd docker configuration. A copy of the `/etc/sysconfig/docker` file                                                                        |
| /default/etc/system-release                                      | Operating system identification data. A copy of the `/etc/system-release` file                                                                  |
| /default/etc/systemd/system/docker.service.d/http-proxy.conf     | Systemd docker proxy configuration. A copy of the `/etc/systemd/system/docker.service.d/http-proxy.conf` file                                   |
| /default/etc/timezone                                            | The system's timezone. A copy of the `/etc/timezone` file                                                                                       |
| /default/proc/cpuinfo                                            | Information about the processor, such as its type, make, model, and performance. A copy of the `/proc/cpuinfo` file                             |
| /default/proc/meminfo                                            | Information about memory usage, both physical and swap. A copy of the `/proc/meminfo` file                                                      |
| /default/proc/mounts                                             | Mounted filesystems. A copy of the `/proc/mounts` file                                                                                          |
| /default/proc/uptime                                             | The time the system has been up. A copy of the `/proc/uptime` file                                                                              |
| /default/proc/version                                            | The kernel version. A copy of the `/proc/version` file                                                                                          |
| /default/proc/vmstat                                             | Detailed virtual memory statistics from the kernel. A copy of the `/proc/vmstat` file                                                           |
| /default/var/log/upstart/docker.log                              | Docker upstart logs when running with the upstart init system                                                                                   |
| /replicated/containers/\*.json                                   | Replicated low-level container information. Result of the command `docker inspect <container>`                                                  |
| /replicated/etc/default/replicated                               | Replicated configuration file. A copy of the `/etc/default/replicated` file.                                                                    |
| /replicated/etc/default/replicated-operator                      | Replicated operator configuration file. A copy of the `/etc/default/replicated-operator` file.                                                  |
| /replicated/etc/replicated.conf                                  | Replicated configuration file. A copy of the `/etc/replicated.conf` file.                                                                       |
| /replicated/etc/sysconfig/replicated                             | Replicated configuration file. A copy of the `/etc/sysconfig/replicated` file.                                                                  |
| /replicated/etc/sysconfig/replicated-operator                    | Replicated operator configuration file. A copy of the `/etc/sysconfig/replicated-operator` file.                                                |
| /replicated/internal/auditlog.csv                                | Replicated audit log events dump                                                                                                                |
| /replicated/internal/config-commands.txt                         | Replicated config command results                                                                                                               |
| /replicated/internal/daemon.json                                 | Replicated daemon information                                                                                                                   |
| /replicated/internal/goroutines.txt                              | Replicated thread dump                                                                                                                          |
| /replicated/internal/host-info.json                              | Replicated cluster host info                                                                                                                    |
| /replicated/internal/ledis-app.dump                              | Replicated main database dump                                                                                                                   |
| /replicated/internal/ledis-registry.dump                         | Replicated registry database dump                                                                                                               |
| /replicated/internal/ledis-snapshots.dump                        | Replicated snapshots database dump                                                                                                              |
| /replicated/internal/license.txt                                 | Replicated license information                                                                                                                  |
| /replicated/internal/nodes.txt                                   | A list of all nodes when running with the Replicated Native scheduler                                                                           |
| /replicated/internal/params.json                                 | Replicated runtime configuration                                                                                                                |
| /replicated/internal/replicated-versions.txt                     | Replicated version information                                                                                                                  |
| /replicated/internal/tasks.txt                                   | Replicated current tasks (queued, executing, or sleeping)                                                                                       |
| /replicated/logs/\*.log                                          | Replicated container logs. Result of the command `docker logs <container>`                                                                      |
| /replicated/logs/\*.journald.log                                 | Replicated journald logs when running with the systemd init system. Result of the command `journalctl -u <unit> -r`                             |
| /replicated/var/lib/replicated-operator/replicated-operator.conf | Replicated operator configuration file. A copy of the `/var/lib/replicated-operator/replicated-operator.conf` file                              |
| /replicated/var/log/upstart/\*.log                               | Replicated upstart logs when running with the upstart init system                                                                               |
| /retraced/containers/\*.json                                     | Retraced low-level container information. Result of the command `docker inspect <container>`                                                    |
| /retraced/logs/\*.log                                            | Retraced container logs. Result of the command `docker logs <container>`                                                                        |
| /VERSION.json                                                    | Support-bundle command version information                                                                                                      |
