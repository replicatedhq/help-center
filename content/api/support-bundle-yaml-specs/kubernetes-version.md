---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Get the kubernetes version
index: docs
title: kubernetes.version
weight: "100"
gradient: "purpleToPink"
---

## kubernetes.version

Get the kubernetes version


```yaml
collect:
  v1:
    - kubernetes.version:
        output_dir: /kubernetes/
```


### Outputs

    
- `server_version.json` - A json file containing the version information of the Kubernetes cluster


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  