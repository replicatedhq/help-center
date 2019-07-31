---
date: "2019-07-17T04:02:20Z"
title: "Image Pull Secrets"
description: "Checking if an image pull secret exists"
weight: "36005"
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
    - secret:
        checkName: PG URI
        secretName: postgres
        namespace: default
        key: uri
        outcomes:
          - fail:
              message: You don't have a pg uri secret
          - pass:
              message: Probably a green light connecting to pg

```
