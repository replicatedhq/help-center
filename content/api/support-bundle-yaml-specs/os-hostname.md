---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Get the hostname
index: docs
title: os.hostname
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## os.hostname

**type object**

Get the hostname


```yaml
collect:
  v1:
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

  