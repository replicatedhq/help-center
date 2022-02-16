---
categories:
- analyze-yaml-variable-specs
date: 2019-05-07T12:00:00Z
description: Reference to an "os.read-file" collect spec by path
index: docs
title: coreReadFilePath
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## coreReadFilePath

**type object**

Reference to an "os.read-file" collect spec by path


```yaml
analyze:
  v1:
    - registerVariables:
        - coreReadFilePath:
            paths:
              - /proc/cpuinfo
            regexpCaptureAll:
              regexp: 'processor\s+:\s+(\d+)'
              index: 1
```


### Required Parameters


- `paths` - A list of paths as a reference to the "os.read-file" collect spec



### Optional Parameters


- `eval` - Evaluates a templated string


- `identity` - The file


- `regexpCapture` - Evaluates a regular expression on the file. Returns the first match


- `regexpCaptureAll` - Evaluates a regular expression on the file. Returns all matches


- `scannable` - Will read the file one line at a time and apply the variable expressions

