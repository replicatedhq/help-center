---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect information about the system's uptime
index: docs
title: os.uptime
weight: "100"
gradient: "purpleToPink"
---

## os.uptime

Collect information about the system's uptime


```yaml
collect:
  v1:
    - os.uptime:
        output_dir: /system/uptime
```


### Optional Parameters


- `template` - Template for the human-readable output



### Outputs

    
- `contents` - The contents of the uptime file


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  