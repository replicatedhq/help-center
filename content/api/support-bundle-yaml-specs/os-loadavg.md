---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect information about CPU load
index: docs
title: os.loadavg
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## os.loadavg

**type object**

Collect information about CPU load


```yaml
collect:
  v1:
    - os.loadavg:
        output_dir: /system/load
```


### Optional Parameters


- `template` - (Optional) a template for the human-readable output



### Outputs

    
- `contents` - The raw loadavg info 


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  