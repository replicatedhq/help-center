---
categories:
- analyze-yaml-variable-specs
date: 2019-05-07T12:00:00Z
description: Reference to a file by the path in the collect bundle
index: docs
title: fileMatch
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## fileMatch

**type object**

Reference to a file by the path in the collect bundle


```yaml
analyze:
  v1:
    - registerVariables:
        - fileMatch:
            pathRegexps:
              - /containers/replicated-operator\.json
              - /inspect/replicated-operator\.json
              - /replicated-operator-inspect\.json
            regexpCapture:
              regexp: '"PUBLIC_ADDRESS=([^"]+)"'
              index: 1
```


### Required Parameters


- `pathRegexps` - A list of path regular expressions as a reference to a file in a collect bundle



### Optional Parameters


- `eval` - Evaluates a templated string


- `identity` - The file


- `regexpCapture` - Evaluates a regular expression on the file. Returns the first match


- `regexpCaptureAll` - Evaluates a regular expression on the file. Returns all matches


- `scannable` - Will read the file one line at a time and apply the variable expressions

