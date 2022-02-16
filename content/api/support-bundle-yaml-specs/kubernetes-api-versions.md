---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: The API versions of the Kubernetes cluster
index: docs
title: kubernetes.api-versions
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## kubernetes.api-versions

**type object**

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

  