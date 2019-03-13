---
categories:
- ship-config
date: 2018-01-17T23:51:55Z
description: The `items` property is a grouping of similar config items.
index: docs
title: items
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/overview) | [Config](/api/ship-config/overview) | [Lifecycle](/api/ship-lifecycle/overview)

## items

The `items` property is a grouping of similar config items.




### Examples

```yaml
config:
  v1:
    - items:
        name: http_enabled
        title: HTTP Enabled
        help_text: When enabled we will listen to http
        type: bool
        default: '0'
```
