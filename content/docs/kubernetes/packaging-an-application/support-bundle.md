---
date: "2016-07-03T04:02:20Z"
title: "Support Bundle"
description: "Installed instances can generate a support bundle with relevant logs and instance information."
weight: "2607"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
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
Custom support bundle files and commands can be included by setting a default troubleshoot spec in [Replicated Console](https://console.replicated.com/troubleshoot/specs). The support bundle task definitions can be found [here](/api/support-bundle-yaml-specs/shared).


{{< linked_headline "Excluding Logs From Support Bundles" >}}
If a pod's logs may contain sensitive information or are simply large and not useful for your debugging processes, you can exclude that pod's logs from support bundles. To do this, add the label `com.replicated.excludelogs=true` to the pod in question.

{{< linked_headline "Default Support Files" >}}

By default the Support Bundle will include the following files:

| File | Description |
|------|-------------|
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
| /default/proc/meminfo | Information about memory usage, both physical and swap. A copy of the `/proc/meminfo` file |
| /default/proc/mounts | Mounted filesystems. A copy of the `/proc/mounts` file |
| /default/proc/uptime | The time the system has been up. A copy of the `/proc/uptime` file |
| /default/proc/version | The kernel version. A copy of the `/proc/version` file |
| /default/proc/vmstat | Detailed virtual memory statistics from the kernel. A copy of the `/proc/vmstat` file |
| /default/var/log/upstart/docker.log | Docker upstart logs when running with the upstart init system |
| /replicated/internal/audit_events.csv | Replicated audit log events dump |
| /replicated/internal/config-commands.txt | Replicated config command results |
| /replicated/internal/daemon.json | Replicated daemon information |
| /replicated/internal/goroutines.txt | Replicated thread dump |
| /replicated/internal/host-info.json | Replicated cluster host info |
| /replicated/internal/ledis-app.dump | Replicated main database dump |
| /replicated/internal/ledis-registry.dump | Replicated registry database dump |
| /replicated/internal/ledis-snapshots.dump | Replicated snapshots database dump |
| /replicated/internal/license.txt | Replicated license information |
| /replicated/internal/params.json | Replicated runtime configuration |
| /replicated/internal/replicated-versions.txt | Replicated version information |
| /replicated/internal/tasks.txt | Replicated current tasks (queued, executing, or sleeping) |
| /scheduler/kubernetes/api_versions.json | Kubernetes API versions |
| /scheduler/kubernetes/cluster_info.json | Kubernetes cluster info |
| /scheduler/kubernetes/server_version.json | Kubernetes server version |
| /scheduler/kubernetes/logs/\<pod\>-\<container\>/\<pod\>.log | App container logs |
| /scheduler/kubernetes/replicated/\<replicated_pod\>-replicated/\<replicated_pod\>.log | Replicated container logs |
| /scheduler/kubernetes/replicated/\<replicated_pod\>-replicated-ui/\<replicated_pod\>.log | Replicated UI container logs |
| /scheduler/kubernetes/resources/componentstatuses/resource.json | Kubernetes componentstatuses info |
| /scheduler/kubernetes/resources/configmaps/resource.json | Kubernetes configmaps info |
| /scheduler/kubernetes/resources/daemonsets/resource.json | Kubernetes daemonsets info |
| /scheduler/kubernetes/resources/deployments/resource.json | Kubernetes deployments info |
| /scheduler/kubernetes/resources/endpoints/resource.json | Kubernetes endpoints info |
| /scheduler/kubernetes/resources/events/resource.json | Kubernetes events info |
| /scheduler/kubernetes/resources/horizontalpodautoscalers/resource.json | Kubernetes horizontalpodautoscalers info |
| /scheduler/kubernetes/resources/ingresses/resource.json | Kubernetes ingresses info |
| /scheduler/kubernetes/resources/jobs/resource.json | Kubernetes jobs info |
| /scheduler/kubernetes/resources/limitranges/resource.json | Kubernetes limitranges info |
| /scheduler/kubernetes/resources/networkpolicies/resource.json | Kubernetes networkpolicies info |
| /scheduler/kubernetes/resources/nodes/resource.json | Kubernetes nodes info |
| /scheduler/kubernetes/resources/persistentvolumeclaims/resource.json | Kubernetes persistentvolumeclaims info |
| /scheduler/kubernetes/resources/persistentvolumes/resource.json | Kubernetes persistentvolumes info |
| /scheduler/kubernetes/resources/podsecuritypolicies/resource.json | Kubernetes podsecuritypolicies info |
| /scheduler/kubernetes/resources/pods/resource.json | Kubernetes pods info |
| /scheduler/kubernetes/resources/podtemplates/resource.json | Kubernetes podtemplates info |
| /scheduler/kubernetes/resources/replicasets/resource.json | Kubernetes replicasets info |
| /scheduler/kubernetes/resources/replicationcontrollers/resource.json | Kubernetes replicationcontrollers info |
| /scheduler/kubernetes/resources/resourcequotas/resource.json | Kubernetes resourcequotas info |
| /scheduler/kubernetes/resources/secrets/resource.json | Kubernetes secrets info |
| /scheduler/kubernetes/resources/services/resource.json | Kubernetes services info |
| /scheduler/kubernetes/resources/statefulsets/resource.json | Kubernetes statefulsets info |
| /scheduler/kubernetes/resources/storageclasses/resource.json | Kubernetes storageclasses info |
| /VERSION.json | Support-bundle command version information |
