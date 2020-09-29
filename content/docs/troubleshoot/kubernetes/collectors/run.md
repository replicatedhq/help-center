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
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - run:
        name: ping-google
        namespace: default
        image: flungo/netutils
        command: ["ping"]
        args: ["www.google.com"]
        timeout: 5s
        imagePullPolicy: IfNotPresent
```

The timeout will be 20 seconds or the timeout specified, whichever is shorter.

The imagePullPolicy will be "IfNotPresent" if not specified.

## Included resources

When this collector is executed, it will include the following files in a support bundle:

### /run/\<name\>.txt
This will contain the pod output (up to 10000 lines).
