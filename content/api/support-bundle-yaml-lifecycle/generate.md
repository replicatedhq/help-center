---
categories:
- support-bundle-yaml-lifecycle
date: 2019-05-07T12:00:00Z
description: Adds a step that will generate a support bundle. It has one argument, use_defaults
index: docs
title: generate
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## generate

**type object**

Adds a step that will generate a support bundle. It has one argument, use_defaults


```yaml
lifecycle:
  v1:
    - generate:
        use_defaults: true
```


### Optional Parameters


- `use_defaults` - Whether to include the default support bundle files - cpu info, docker ps, etc

