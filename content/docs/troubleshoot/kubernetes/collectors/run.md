---
date: "2019-07-17T04:02:20Z"
title: "Run a pod"
description: "Running a new pod"
weight: "35006"
categories: [ "Kubernetes Troubleshoot" ]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

The run pod collector is not automatically included. You need to specify it in your spec to include pod logs. You can include this spec multiple times.


```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  - run:
      name: ping-google
      namespace: default
      image: ubuntu:latest
      command: ["ping"]
      args: ["www.google.com"]

```

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### /run/\<name\>.txt
This will contain the pod output (up to 10000 lines).


