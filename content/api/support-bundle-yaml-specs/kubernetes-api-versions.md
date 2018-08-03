---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: The API versions of the Kubernetes cluster
index: docs
title: kubernetes.api-versions
weight: "100"
gradient: "purpleToPink"
---

## kubernetes.api-versions

The API versions of the Kubernetes cluster


```yaml
collect:
  v1:
    - kubernetes.api-versions:
        output_dir: /kubernetes/
```


### Outputs

    
- `api_versions.json` - A json file holding a list of the API versions


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  