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
   - clusterVersion:
       - fail:
           when: "< 1.13.0"
           message: You need more kubernetes
       - warn:
           when: "< 1.15.0"
           message: You have barely enough kubernetes
       - pass:
           message: Good job keeping k8s current
```
