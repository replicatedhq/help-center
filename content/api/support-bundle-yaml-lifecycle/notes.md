---
categories:
- support-bundle-yaml-lifecycle
date: 2019-05-07T12:00:00Z
description: Adds a step to prompt the end customer to enter a note to be uploaded with the support bundle
index: docs
title: notes
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## notes

**type object**

Adds a step to prompt the end customer to enter a note to be uploaded with the support bundle


```yaml
lifecycle:
  v1:
    - notes:
        prompt: 'Please enter a note for the support bundle: '
```


### Optional Parameters


- `prompt` - the message prompt to display to the end customer for entering a note

