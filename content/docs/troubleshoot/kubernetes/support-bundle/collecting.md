---
date: "2019-07-17T04:02:20Z"
title: "Collecting Support Bundles"
description: "How to collect a support bundle"
weight: "33004"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

Before you can collect a support bundle, you need to have a client-only component available. Nothing needs to be installed in the cluster. The Troubleshoot client utility is packaged as a kubectl plugin, and can be installed using [krew](https://krew.dev). For instructions on how to install krew, visit [https://github.com/kubernetes-sigs/krew/#installation](https://github.com/kubernetes-sigs/krew/#installation).

If you have krew installed, the next step is to install the Troubleshoot plugin:

```shell
kubectl krew install support-bundle
kubectl support-bundle <uri/path>
```

Once it's installed, you can test it by generating and downloading a sample support bundle:

```shell
kubectl support-bundle https://support-bundle.replicated.com
```

This will connect to the cluster defined in your local kubecontext, and collect some basic information about the cluster. After it's finished, it will write a file named "support-bundle.tar.gz" to the current working directory.
