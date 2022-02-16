---
categories:
- ship-lifecycle
date: 2018-01-17T23:51:55Z
description: A `render` step will do the work of collecting configuration values from a user and using them to generate the final assets that can be used to deploy an application. If an `assets` field is set, those assets will be rendered rather than the top-level `assets` object
index: docs
title: render
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle)

## render

A `render` step will do the work of collecting configuration values from a user and using them to generate the final assets that can be used to deploy an application. If an `assets` field is set, those assets will be rendered rather than the top-level `assets` object




### Examples

```yaml
lifecycle:
  v1:
    - render: {}
```

```yaml
lifecycle:
  v1:
    - render:
        root: ./
```

```yaml
lifecycle:
  v1:
    - render:
        root: ./
        assets:
          v1:
            - inline:
                contents: some-asset
                dest: some-path.txt
```
