---
date: "2019-07-17T04:02:20Z"
title: "CRD"
description: "Checking if a CRD exists in the cluster"
weight: "36006"
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
  name: preflight-sample
spec:
  analyzers:
    - customResourceDefinition:
        customResourceDefinitionName: rook
        outcomes:
          - fail:
              message: You don't have rook installed
          - pass:
              message: Found rook!
```
