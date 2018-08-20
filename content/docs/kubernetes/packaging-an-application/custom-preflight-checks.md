---
date: "2017-01-26T00:00:00Z"
title: "Custom Preflight Checks"
description: "A guide to implementing the Custom Preflight Checks feature to analyze customer systems to determine if the environment meets the minimum requirements for installation or update."
weight: "2608"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

A preflight check is a test that is run before installing and running an application.  The test will analyze the system to determine if the environment meets the minimum requirements.

The preflight check may be manually run for an existing installation by visiting https://&lt;your server address&gt;:8800/run-checks

Additionally, it's recommended to specify additional system requirements in the `host_requirements` section of the
application YAML. These host requirements will apply to single node installs, as well as each node on distributed
installs.

```yaml
name: My Counter App
host_requirements:
  docker_version: "1.10.3"
  cpu_cores: 2
  cpu_mhz: 2400
  memory: 8GB
  disk_space: 80GB
  docker_space: 10GB
  replicated_version: ">=2.3.0 <2.4.1"
```

{{< version version="2.3.0" >}} The application level `host_requirements` key can be used to automatically upgrade Replicated.  This feature can be enabled by specifying a version range in the the `replicated_version` key.  Version range syntax is similar to that used by [npm](https://docs.npmjs.com/misc/semver).  Versions that don't support this feature will simply ignore the value.  This key is also ignored by the pre-flight checks.

Replicated enforces these requirements and will not allow the customer to start the application without either meeting these requirements or
dismissing the warnings. Upon dismissing preflight warnings, an entry will be recorded in the on-premise audit log.

![Preflight Checks Screenshot](/images/post-screens/preflight-checks.png)

{{% page_notes %}}
- `min_disk_space` does not guarantee free space, it refers to the disk size mounted at the specified location.
- The requested `docker_version` must be one of the versions Replicated supports.
{{% /page_notes %}}
