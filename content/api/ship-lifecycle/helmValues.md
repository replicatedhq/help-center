---
categories:
- ship-lifecycle
date: 2018-01-17T23:51:55Z
description: A `helmValues` step displays an editor for the end user to configure helm values. The rendered values are available at `.ship/tmp/values.yaml`
index: docs
title: helmValues
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/overview) | [Config](/api/ship-config/overview) | [Lifecycle](/api/ship-lifecycle/overview)

## helmValues

A `helmValues` step displays an editor for the end user to configure helm values. The rendered values are available at `.ship/tmp/values.yaml`




### Examples

```yaml
lifecycle:
  v1:
    - helmValues: {}
```

```yaml
lifecycle:
  v1:
    - helmValues:
        path: subcharts/consul/values.yaml
```
