---
categories:
- analyze-yaml-variable-specs
date: 2019-05-07T12:00:00Z
description: Reference to a collect spec
index: docs
title: collectRef
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## collectRef

**type object**

Reference to a collect spec


```yaml
analyze:
  v1:
    - registerVariables:
        - collectRef:
            selector:
              analyze: docker-info
            regexpCapture:
              regexp: '"ServerVersion": *"([^"]+)"'
              index: 1
```


### Optional Parameters


- `eval` - Evaluates a templated string


- `identity` - The file


- `name` - Selector to reference the meta.name of a collect spec


- `regexpCapture` - Evaluates a regular expression on the file. Returns the first match


- `regexpCaptureAll` - Evaluates a regular expression on the file. Returns all matches


- `scannable` - Will read the file one line at a time and apply the variable expressions


- `selector` - Selector to reference the meta.labels of a collect spec

