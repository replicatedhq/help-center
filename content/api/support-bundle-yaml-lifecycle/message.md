---
categories:
- support-bundle-yaml-lifecycle
date: 2019-05-07T12:00:00Z
description: Adds a step to print a message to the end customer
index: docs
title: message
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## message

**type object**

Adds a step to print a message to the end customer


```yaml
lifecycle:
  v1:
    - message:
        contents: >-
          This process will collect a number of files from the host system to
          help you debug your problem
```


### Required Parameters


- `contents` - is the message

