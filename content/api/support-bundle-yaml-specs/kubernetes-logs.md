---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect the logs for one or more kubernetes pods
index: docs
title: kubernetes.logs
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## kubernetes.logs

**type object**

Collect the logs for one or more kubernetes pods


```yaml
collect:
  v1:
    - kubernetes.logs:
        output_dir: /kubernetes/api-pod-logs
        pod: cooltool-api-110212121-ab123ef
        namespace: default
        pod_log_options:
          timestamps: true
          sinceSeconds: 1000000
          limitBytes: 1000000000
        timeout_seconds: 30
```

```yaml
collect:
  v1:
    - kubernetes.logs:
        output_dir: /kubernetes/api-pod-logs
        namespace: default
        pod_log_options:
          timestamps: true
          sinceSeconds: 1000000
          limitBytes: 1000000000
        list_options:
          labelSelector: type=reporting
        timeout_seconds: 30
```


### Optional Parameters


- `list_options` - The Kubernetes pod query options (used when querying for a label selector)


- `namespace` - The Kubernetes namespace. If no namespace is provided, results from all namespaces are included


- `pod` - The Kubernetes pod


- `pod_log_options` - The Kubernetes pod log options



### Outputs

    
- `{{.Namespace}}/{{.Name}}.log` - Logs pulled from Kubernetes pod. Kubernetes pulls logs from stdout/stderr into one output file. If a label selector is provided, it will create multiple log files following the same format. Used when a namespace is not provided.

- `{{.Name}}.log` - Logs pulled from Kubernetes pod. Kubernetes pulls logs from stdout/stderr into one output file. If a label selector is provided, it will create multiple log files following the same format.


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  