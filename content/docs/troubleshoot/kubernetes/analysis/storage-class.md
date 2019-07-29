---
date: "2019-07-17T04:02:20Z"
title: "Storage Class"
description: "Checking for a specific Kubernetes version"
weight: "36003"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Preflight
metadata:
  name: preflight-sample
spec:
  analyzers:
    - storageClass:
        checkName: Required storage classes
        storageClassName: "microk8s-hostpath"
        outcomes:
          - fail:
              message: The microk8s storage class thing was not found
          - pass:
              message: All good on storage classes
```
