---
date: "2019-07-17T04:02:20Z"
title: "Troubleshoot Operator"
description: "A description of the role of the CRD"
weight: "33003"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

The list of troubleshoot collectors is delivered in a Kubernetes YAML that conforms to the Replicated Troubleshoot CRD. However, the CRD is not required to use the Troubleshoot tool.

The reason a CRD is created is for packaging. It's useful to have a default, but customized set of support bundle collectors distributed with the application. By writing these as a custom resource that confirms to the Replicated Troubleshoot CRD, they can be stored in the cluster. The specs will be delivered as part of the application release, including adding to the generated airgap bundle, and be ready in the cluster. Deploying a collector spec to a cluster will not generate a support bundle, it just contains the definition of the support bundle that can be collected at a later date.
