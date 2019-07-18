---
date: "2019-07-17T04:02:20Z"
title: "Cluster Info"
description: "Collecting information about the cluster in the support bundle"
weight: "35003"
categories: [ "Kubernetes Troubleshoot" ]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

The cluster info collector is a default collector-- it will be automatically included in your collector spec if you don't include it.

This collector does not accept any parameters.

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: sample
spec:
  - clusterInfo: {}
```

## Included resources

When the cluster info collector is executed it will include the following files in a support bundle:

### /cluster-info/cluster-version.json
This file contains information describing the Kubernetes cluster version.

```json
{
  "info": {
    "major": "1",
    "minor": "13",
    "gitVersion": "v1.13.6",
    "gitCommit": "abdda3f9fefa29172298a2e42f5102e777a8ec25",
    "gitTreeState": "clean",
    "buildDate": "2019-05-08T13:46:28Z",
    "goVersion": "go1.11.5",
    "compiler": "gc",
    "platform": "linux/amd64"
  },
  "string": "v1.13.6"
}
```
