---
categories:
- analyze-yaml-condition-specs
date: 2019-05-07T12:00:00Z
description: A list of conditions evaluated with the or operator
index: docs
title: or
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## or

**type array**

A list of conditions evaluated with the or operator


```yaml
or:
  - stringCompare:
      eq: centos
    variableRef: os
  - stringCompare:
      eq: rhel
    variableRef: os
```
