---
date: "2019-07-17T04:02:20Z"
title: "Running Preflights"
description: "How to run preflights"
weight: "34002"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
aliases:
  - /docs/troubleshoot/kubernetes/preflight/
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

Once you have the preflight tool installed on your workstation, you can run any preflight checks against any cluster you have access to.

Given a set of preflight checks, for example, at https://git.io/preflight-k8s-version.yaml, you can run:

```shell
kubectl preflight https://git.io/preflight-k8s-version.yaml
```

This will connect to the cluster defined in your local kubecontext, and collect some basic information about the cluster. After it's finished, it will show the results in a terminal based UI, highlighting the passed checks in green, the warning checks in yellow and the failed checks in red. The up and down arrow keys will select different checks, showing information messages and URLs to click for more information.

The format of the YAML that defines what to check supports many different options, and can be customized for almost any use case.
