---
categories:
- analyze-yaml-condition-specs
date: 2019-05-07T12:00:00Z
description: Evaluates a templated string. "{{repl .Ref}}" can be used to refer to a variableRef.
index: docs
title: eval
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## eval

**type string**

Evaluates a templated string. "{{repl .Ref}}" can be used to refer to a variableRef.


```yaml
eval: '{{repl eq .Ref "centos"}}'
```
