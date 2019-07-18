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
   - imagePullSecret:
       name: replicated
       namespace: my-app
       fail:
         message: Can't pull the images
       pass:
         message: Connected to docker registry
```
