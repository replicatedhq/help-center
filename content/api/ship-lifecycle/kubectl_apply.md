---
categories:
- ship-lifecycle
date: 2018-01-17T23:51:55Z
description: A `kubectl_apply` step will run `kubectl apply` with the provided file path and kubeconfig.
index: docs
title: kubectl_apply
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## kubectl_apply

A `kubectl_apply` step will run `kubectl apply` with the provided file path and kubeconfig.





### Required Parameters


- `path` - the file to apply



### Optional Parameters


- `kubeconfig` - the kubeconfig file to use, overriding the system default


### Examples

```yaml
lifecycle:
  v1:
    - kubectl_apply:
        path: config.yml
```

```yaml
lifecycle:
  v1:
    - kubectl_apply:
        path: k8s/another.yml
        kubeconfig: k8s/generated_kubeconfig
```

```yaml
lifecycle:
  v1:
    - kubectl_apply:
        path: k8s/another.yml
        kubeconfig: '{{repl AmazonEKS "eks_cluster_name" }}'
```
