---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Get the Kubernetes cluster info
index: docs
title: kubernetes.cluster-info
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## kubernetes.cluster-info

**type object**

Get the Kubernetes cluster info


```yaml
collect:
  v1:
    - kubernetes.cluster-info:
        output_dir: /kubernetes/
```


### Outputs

    
- `cluster_info.json` - A json file holding the Kubernetes cluster info


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  