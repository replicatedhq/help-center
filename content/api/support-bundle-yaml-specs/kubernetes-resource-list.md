---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect a list of resources managed by the cluster
index: docs
title: kubernetes.resource-list
weight: "100"
gradient: "purpleToPink"
---

## kubernetes.resource-list

**type object**

Collect a list of resources managed by the cluster


```yaml
collect:
  v1:
    - kubernetes.resource-list:
        output_dir: /kubernetes/resources/deployments
        namespace: default
        kind: deployments
```

```yaml
collect:
  v1:
    - kubernetes.resource-list:
        output_dir: /kubernetes/resources/deployments-apps-v1beta2
        namespace: default
        kind: deployments
        group_version: apps/v1beta2
```

```yaml
collect:
  v1:
    - kubernetes.resource-list:
        output_dir: /kubernetes/resources/services
        kind: svc
```


### Required Parameters


- `kind` - The Kubernetes resource kind, as would be passed to `kubectl get`



### Optional Parameters


- `group_version` - Optionally override the default group and version for the resource kind (in the format "group/version").


- `namespace` - The Kubernetes namespace. If no namespace is provided, results from all namespaces are included


- `resource_list_options` - An instance of metav1.ListOptions



### Outputs

    
- `resource.json` - Logs pulled from Kubernetes pod. Kubernetes pulls logs from stdout/stderr into one output file. If a label selector is provided, it will create multiple log files following the same format.


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  