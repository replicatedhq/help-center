---
categories:
- analyze-yaml-condition-specs
date: 2019-05-07T12:00:00Z
description: A list of conditions evaluated with the and operator
index: docs
title: and
weight: "100"
gradient: "purpleToPink"
---

## and

**type array**

A list of conditions evaluated with the and operator


```yaml
and:
  - not:
      empty: {}
      variableRef: memoryUsageAvailable
  - not:
      empty: {}
      variableRef: memoryUsageTotal
```
