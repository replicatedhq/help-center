---
categories:
- analyze-yaml-specs
date: 2018-01-17T23:51:55Z
description: Check that the total memory for a cluster meets the required minimum
index: docs
title: kubernetes.total-memory
weight: "100"
gradient: "purpleToPink"
---

## kubernetes.total-memory

Check that the total memory for a cluster meets the required minimum


```yaml
analyze:
  v1:
    - kubernetes.total-memory:
        minimum: 20Gi
```


### Required Parameters


- `minimum` - The minimum total memory requirement

