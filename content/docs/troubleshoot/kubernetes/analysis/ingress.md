---
date: "2019-07-17T04:02:20Z"
title: "Ingress"
description: "Checking if an ingress is present"
weight: "36006"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

```yaml
   - manifests:
       - ingress:
           namespace: default
           name: connect-to-me
         fail:
           message: The ingress isn't ingressing
         pass:
           message: All systems ok on ingress
```
