---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect a list of resources managed by the cluster
index: docs
title: kubernetes.resource-list
weight: "100"
---

## kubernetes.resource-list

Collect a list of resources managed by the cluster


```yaml
specs:
  - kubernetes.resource-list:
      output_dir: /kubernetes/default/deployments
      namespace: default
      kind: deployments
```

```yaml
specs:
  - kubernetes.resource-list:
      output_dir: /kubernetes/default/services
      namespace: default
      kind: svc
```

    
### Argument Reference


- `kind` - The Kubernetes resource kind, as would be passed to `kubectl get`

- `namespace` - The Kubernetes namespace

- `resource_list_options` - An instance of metav1.ListOptions

    
### Inherited Arguments


- `description` - A description of the file(s) being collected.

- `meta` - Metadata about the file(s)

- `output_dir` - Path in the bundle to which the file(s) should be output

- `timeout_seconds` - How long to wait for this collection to complete before abandoning it

- `scrub` - An optional specification of on how to scrub sensitive data from the collected files
