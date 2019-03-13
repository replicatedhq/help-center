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

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle)

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
