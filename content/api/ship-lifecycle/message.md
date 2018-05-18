---
categories:
- ship-lifecycle
date: 2018-01-17T23:51:55Z
description: A `message` step will print a message to the console or UI.
index: docs
title: message
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## message

A `message` step will print a message to the console or UI.


```yaml
lifecycle:
  v1:
    - message:
        contents: >-
          This tool will prepare assets to deploy CoolTool Enterprise to your
          Kubernetes cluster
```

```yaml
lifecycle:
  v1:
    - message:
        contents: >-
          You may be missing a required prerequisite for this application.
          Please ensure docker is configured on the target server.
        level: warn
```

    
### Required Parameters


- `contents` - the message to display


    
### Optional Parameters


- `level` - the severity of the message -- defaults to `info`. Other options are `debug`, `warn`, and `error`


    
    