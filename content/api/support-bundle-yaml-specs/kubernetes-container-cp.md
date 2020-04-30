---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect a file or directory from one or more kubernetes pods and containers. If the container name is not specified, files will be collected from all containers within the pods.
index: docs
title: kubernetes.container-cp
weight: "100"
gradient: "purpleToPink"
---

## kubernetes.container-cp

**type object**

Collect a file or directory from one or more kubernetes pods and containers. If the container name is not specified, files will be collected from all containers within the pods.


```yaml
collect:
  v1:
    - kubernetes.container-cp:
        output_dir: /kubernetes/all-api-pod-logs
        pod: cooltool-api-110212121-ab123ef
        namespace: default
        src_path: /logs/app.log
        timeout_seconds: 30
```

```yaml
collect:
  v1:
    - kubernetes.container-cp:
        output_dir: /kubernetes/api-pod-logs
        pod: cooltool-api-110212121-ab123ef
        container: api
        namespace: default
        src_path: /logs/app.log
        timeout_seconds: 30
```

```yaml
collect:
  v1:
    - kubernetes.container-cp:
        output_dir: /kubernetes/deployment-pod-logs
        pod_list_options:
          labelSelector: run=api
        src_path: /logs/
```


### Required Parameters


- `src_path` - The path to copy from within the container



### Optional Parameters


- `container` - The Kubernetes container. If omitted, files will be copied from all containers in matched pods


- `namespace` - The Kubernetes namespace. If no namespace is provided, results from all namespaces are included


- `pod` - The Kubernetes pod


- `pod_list_options` - The Kubernetes pod query options (used when querying for a label selector)



### Outputs

    
- `{{.Namespace}}/{{.Pod}}/{{.Container}}/` - A directory holding files copied from the pod and containers specified. Each pod and container will have a directory. Used when neither a pod name or a namespace is provided.

- `{{.Pod}}/{{.Container}}/` - A directory holding files copied from the pod and containers specified. Each pod and container will have a directory. Used when a pod name is not provided.

- `{{.Namespace}}/{{.Container}}/` - A directory holding files copied from the pod and containers specified. Each container will have a directory. Used when a pod name is provided, but a namespace is not.

- `{{.Container}}/` - A directory holding files copied from the pod and containers specified. Each container will have a directory. Used when a pod name is provided.


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  