---
categories:
- analyze-yaml-specs
date: 2018-01-17T23:51:55Z
description: Check that the total memory for a cluster meets the required minimum
index: docs
title: kubernetes.version
weight: "100"
gradient: "purpleToPink"
---

## kubernetes.version

Check that the total memory for a cluster meets the required minimum


```yaml
analyze:
  v1:
    - kubernetes.version:
        semver_minimum: 1.10.0
```


### Required Parameters


- `semver_minimum` - The minimum kubernetes version

