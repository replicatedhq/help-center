---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect logs from journald
index: docs
title: journald.logs
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## journald.logs

**type object**

Collect logs from journald


```yaml
collect:
  v1:
    - journald.logs:
        output_dir: /system/journald/cooltool-api
        reverse: true
        unit: cooltool-api
        since: '2018-01-01'
```


### Required Parameters


- `unit` - Systemd unit from which to collect logs



### Optional Parameters


- `reverse` - Store logs in reverse chronological order


- `since` - Since date for log collection



### Outputs

    
- `logs.raw` - The raw output the `journald` logs for the unit


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  