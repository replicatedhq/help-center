---
date: "2017-01-26T00:00:00Z"
title: "Custom Preflight Checks"
description: "A guide to implementing the Custom Preflight Checks feature to analyze customer systems to determine if the environment meets the minimum requirements for installation or update."
weight: "608"
categories: [ "Packaging a Swarm Application" ]
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

A preflight check is a test that is run before installing and running an application.  The test will analyze the system to determine if the environment meets the minimum requirements.

The preflight check may be manually run for an existing installation by visiting:

- `https://[your server address]:8800/run-checks`

By default, Replicated automatically adds preflight checks for:

| **Category** | **Check** |
|--------------|-----------|
| OS | Linux |
| Linux Kernel | 3.10 or greater |
| Memory | 1 GB |
| Docker Version | {{< docker_version_minimum >}} - {{< docker_version_default >}} |
| Disk Space | /tmp 1 GB <br /> /var/lib/replicated 250 MB <br /> /var/lib/docker/aufs 1 GB (aufs storage driver root directory) |
| TCP Ports (Replicated services) | 9870-9880 on docker0 |
| Outbound internet access (if required) | Replicated APIs, external registries |

Additionally, it's recommended to specify additional system requirements in the `host_requirements` section of the application YAML. These host requirements will apply to single node installs, as well as each node on distributed installs.

```yaml
name: My Counter App
host_requirements:
  docker_version: "1.10.3"
  cpu_cores: 2
  cpu_mhz: 2400
  memory: 8GB
  disk_space: 80GB
  replicated_version: ">=2.3.0 <2.4.1"
```

{{< version version="2.3.0" >}} The application level `host_requirements` key can be used to automatically upgrade Replicated.  This feature can be enabled by specifying a version range in the the `replicated_version` key.  Version range syntax is similar to that used by [npm](https://docs.npmjs.com/misc/semver).  Versions that don't support this feature will simply ignore the value.  This key is also ignored by the pre-flight checks.

`docker_version` refers to the lowest acceptable version of docker on the host. Any host running a docker version at or above this value will meet the requirement.

Replicated enforces these requirements and will not allow the customer to start the application without either meeting these requirements or dismissing the warnings. Upon dismissing preflight warnings, an entry will be recorded in the on-premise audit log.

![Preflight Checks Screenshot](/images/post-screens/preflight-checks.png)

{{% page_notes %}}
- `min_disk_space` does not guarantee free space, it refers to the disk size mounted at the specified location.
- The requested `docker_version` must be one of the versions Replicated supports.
{{% /page_notes %}}
