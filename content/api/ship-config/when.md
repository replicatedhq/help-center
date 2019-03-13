---
categories:
- ship-config
date: 2018-01-17T23:51:55Z
description: The `when` property is used to control whether an item will be shown to the end user.
index: docs
title: when
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle)

## when

The `when` property is used to control whether an item will be shown to the end user.




### Examples

```yaml
config:
  v1:
    - when: >-
        '{{repl or (ConfigOptionEquals "select_one" "external")
        (ConfigOptionEquals "select_one" "embedded")}}'
```
