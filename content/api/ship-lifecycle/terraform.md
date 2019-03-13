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

[Assets](/api/ship-assets/overview) | [Config](/api/ship-config/overview) | [Lifecycle](/api/ship-lifecycle/overview)

## terraform

A `terraform` step will deploy terraform resources.





### Optional Parameters


- `path` - the directory within `installer` within which to run terraform.


- `when` - If 'when' is not empty and evaluates to false, the terraform lifecycle step will be skipped.


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
