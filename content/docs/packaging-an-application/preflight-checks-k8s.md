---
date: "2016-07-03T04:02:20Z"
title: "Kubernetes Preflight Checks"
description: "A guide to implementing the Kubernetes Preflight Checks feature to analyze customer systems to determine if the environment meets the minimum requirements for installation or update."
weight: "213"
categories: [ "Packaging" ]
index: "docs"
---

Support for Kubernetes preflight checks has been added as of Replicated {{< version version="2.9.0" >}}.

By default, Replicated automatically adds preflight checks for:

| **Category** | **Check** |
|--------------|-----------|
| Outbound internet access (if required) | Replicated APIs, external registries |

Additional Kubernetes system requirements can be specified in the `kubernetes.requirements` section of the application YAML.

Possible checks include:

| **Property** | **Check** |
|--------------|-----------|
| server_version | Kubernetes server version (must be specified as a semver range) |
| api_versions | Supported API versions on the server (in the form of "group/version") |
| cluster_size | Minumum cluster size (nodes) |
| total_cores | Minumum total cores |
| total_memory | Minumum total memory |

### Example:

```yaml
kubernetes:
  requirements:
    server_version: ">=1.6.0"
    api_versions: ["apps/v1beta1"]
    cluster_size: 3
    total_cores: 3
    total_memory: 11.25GB
```
