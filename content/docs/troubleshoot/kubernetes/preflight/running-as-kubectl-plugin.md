---
date: "2019-07-17T04:02:20Z"
title: "kubectl Plugin"
description: "Running Preflight Checks as a kubectl Plugin"
weight: "34010"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

```shell
krew install preflight
kubectl preflight run <uri/path>
```

If the preflight is already installed because it was included in the app:

```shell
kubectl preflight run
```

If there are multiple preflight-enabled apps:

```
kubectl preflight run --preflight <name>
```

This will not require the CRD. If the CRD is not present, the CLI can manage the process.

