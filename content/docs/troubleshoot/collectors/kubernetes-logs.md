---
date: "2018-03-03T04:02:20Z"
title: "Kubernetes Logs Collector"
description: "The Kubernetes Logs Custom Collector"
weight: "1706"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
aliases: [ /docs/troubleshoot/collectors ]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Kubernetes Logs

Collecting Kubernetes pod logs is a commonly used feature of a collector. This collector is the equivelent of `kubectl logs` and including the output in the support bundle.

This collector is fully documented in the [reference docs](/api/support-bundle-yaml-specs/kubernetes-logs/).

### Example

To illustrate how to use this collector, we'll create a collector that includes all logs from pods with a "app=api" label selector.

```yaml
collect:
  v1:
    - kubernetes.logs:
      output_dir: /kubernetes/api-pod-logs
      namespace: default
      pod_log_options:
        timestamps: true
        sinceSeconds: 1000000
        limitBytes: 1000000000
      list_options:
        labelSelector: app=api
      timeout_seconds: 30
```

