---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Get the Kubernetes cluster info
index: docs
title: kubernetes.cluster-info
weight: "100"
gradient: "purpleToPink"
---

## kubernetes.cluster-info

Get the Kubernetes cluster info


```yaml
specs:
  - kubernetes.cluster-info:
      output_dir: /kubernetes/
```


### Outputs

    
- `cluster_info.json` - A json file holding the Kubernetes cluster info


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

    