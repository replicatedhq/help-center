---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Get the hostname
index: docs
title: os.hostname
weight: "100"
gradient: "purpleToPink"
---

## os.hostname

Get the hostname


```yaml
specs:
  - os.hostname:
      output_dir: /system/hostname
```


    ### Outputs

    
- `stderr` - The stdout from the command

- `stdout` - The stdin from the command


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

    