---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect the logs for one or more kubernetes pods
index: docs
title: kubernetes.logs
weight: "100"
---

## kubernetes.logs

Collect the logs for one or more kubernetes pods


```yaml
specs:
  - kubernetes.logs:
      output_dir: /kubernetes/api-pod-logs
      pod: cooltool-api-110212121-ab123ef
      namespace: default
      pod_log_options:
        timestamps: true
        sinceSeconds: 1000000
        limitBytes: 1000000000
      timeout_seconds: 30
```

    
### Argument Reference


- `namespace` - The Kubernetes namespace

- `pod` - The Kubernetes pod

- `pod_log_options` - The Kubernetes pod log options

    
### Inherited Arguments


- `description` - A description of the file(s) being collected.

- `meta` - Metadata about the file(s)

- `output_dir` - Path in the bundle to which the file(s) should be output

- `timeout_seconds` - How long to wait for this collection to complete before abandoning it

- `scrub` - An optional specification of on how to scrub sensitive data from the collected files
