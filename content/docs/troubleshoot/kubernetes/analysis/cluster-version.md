---
date: "2019-07-17T04:02:20Z"
title: "Cluster Version"
description: "Checking for a specific Kubernetes version"
weight: "36002"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

{{<legacynotice>}}

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: check-kubernetes-version
spec:
  analyzers:
    - clusterVersion:
        outcomes:
          - fail:
              when: "< 1.14.0"
              message: The application requires at Kubernetes 1.14.0 or later, and recommends 1.15.0.
              uri: https://www.kubernetes.io
          - warn:
              when: "< 1.15.0"
              message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.15.0 or later.
              uri: https://kubernetes.io
          - pass:
              message: Your cluster meets the recommended and required versions of Kubernetes.
```
