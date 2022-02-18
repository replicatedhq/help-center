---
categories:
- analyze-yaml-variable-specs
date: 2019-05-07T12:00:00Z
description: Evaluates a templated string
index: docs
title: eval
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## eval

**type string**

Evaluates a templated string


```yaml
analyze:
  v1:
    - registerVariables:
        - eval: '{{repl .processors | len}}'
```
