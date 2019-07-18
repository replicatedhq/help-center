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

Before you can run preflight checks, you need to have a client-only component available. Nothing needs to be installed in the cluster. The Preflight client utility is packaged as a kubectl plugin, and can be installed using [krew](https://krew.dev). For instructions on how to install krew, visit [https://github.com/kubernetes-sigs/krew/#installation](https://github.com/kubernetes-sigs/krew/#installation).

If you have krew installed, the next step is to install the Preflight plugin:

```shell
kubectl krew install preflight
kubectl preflight <uri/path>
```

Once it's installed, you can test it by running a set of sample preflight checks against your cluster:

```shell
kubectl preflight https://preflight.replicated.com/sample
```

This will connect to the cluster defined in your local kubecontext, and collect some basic information about the cluster. After it's finished, it will show the results in a terminal based UI, highlighting the passed checks in green, the warning checks in yellow and the failed checks in red. The up and down arrow keys will select different checks, showing information messages and URLs to click for more information.

