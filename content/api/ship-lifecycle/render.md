---
categories:
- ship-lifecycle
date: 2018-01-17T23:51:55Z
description: A `render` step will do the work of collecting configuration values from a user and using them to generate the final assets that can be used to deploy an application.
index: docs
title: render
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## render

A `render` step will do the work of collecting configuration values from a user and using them to generate the final assets that can be used to deploy an application.


```yaml
lifecycle:
  v1:
    - render: {}
```

```yaml
lifecycle:
  v1:
    - render:
        skip_plan: true
        skip_state_warning: true
```

    
### Optional Parameters


- `skip_plan` - Whether to skip the "plan" phase of `render`, in which the user can confirm the actions that Ship will take to generate application assets


- `skip_state_warning` - If set to `true`, will omit the default warning message informing the user that a state file has been created and to save that state file for future ship runs. If this is set to `true`, your YAML should specify a `message` step that explains the purpose and importance of this state file.


    
    