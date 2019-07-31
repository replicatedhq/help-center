---
date: "2019-07-17T04:02:20Z"
title: "How To Run"
description: "A quick start to running troubleshoot in a cluster"
weight: "32002"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

Both Troubleshoot and Preflight are built and packaged to be run by the cluster administrator, with no knowledge of the application.

## Preflight Checks

Preflight Checks are designed to be run before the application is installed. There are no in-cluster prerequisites, but there's a client side kubectl plugin that's required. To install the preflight client-side functionality, run `kubectl krew install preflight`. For instructions on how to get krew or for additional installation options, see the [Running Preflights](/docs/troubleshoot/kubernetes/preflight/executing/) document.

Once the plugin is installed, you can run a set of sample Preflight Checks with:

```shell
kubectl preflight https://preflight.replicated.com
```

## Support Bundles

Support Bundles are designed to be run when something is wrong with an application. There are no in-cluster prerequisites, but again, there's a client side kubectl plugin that's required. To install, run `kubectl krew install troubleshoot`. For instructions on how to get krew or for additional installation options, see the [Collecting Support Bundles](/docs/troubleshoot/kubernetes/preflight/executing/) document.

Once the plugin is installed, you can generate a sample Support Bundle with:

```shell
kubectl troubleshoot https://troubleshoot.replicated.com
```
