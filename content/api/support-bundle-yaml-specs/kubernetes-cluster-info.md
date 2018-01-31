---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Get the kubernetes cluster info
index: docs
title: kubernetes.cluster-info
weight: "100"
---

## kubernetes.cluster-info

Get the kubernetes cluster info


```yaml
specs:
  - kubernetes.cluster-info:
      output_dir: /kubernetes/cluster-info
```

    
### Inherited Arguments


- `description` - A description of the file(s) being collected.

- `meta` - Metadata about the file(s)

- `output_dir` - Path in the bundle to which the file(s) should be output

- `timeout_seconds` - How long to wait for this collection to complete before abandoning it

- `scrub` - An optional specification of on how to scrub sensitive data from the collected files
