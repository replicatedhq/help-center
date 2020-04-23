---
categories:
- analyze-yaml-variable-specs
date: 2019-05-07T12:00:00Z
description: Identifies the cloud provider given an ip address
index: docs
title: whichCloud
weight: "100"
gradient: "purpleToPink"
---

## whichCloud

**type object**

Identifies the cloud provider given an ip address


```yaml
analyze:
  v1:
    - registerVariables:
        - whichCloud:
            variableRef: publicAddress
```


### Required Parameters


- `variableRef` - Variable reference to the ip address

