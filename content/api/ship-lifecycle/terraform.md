---
categories:
- ship-lifecycle
date: 2018-01-17T23:51:55Z
description: A `terraform` step will deploy terraform resources.
index: docs
title: terraform
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## terraform

A `terraform` step will deploy terraform resources.



### Optional Parameters


- `path` - the directory within `installer` within which to run terraform.


### Examples

```yaml
lifecycle:
  v1:
    - terraform: {}
```

```yaml
lifecycle:
  v1:
    - terraform:
        path: terraform/
```
