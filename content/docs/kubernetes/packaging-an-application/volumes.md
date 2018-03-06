---
date: "2016-07-03T04:02:20Z"
title: "Volumes"
description: "An overview of the various sections of the Replicated YAML."
weight: "2603"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{< linked_headline "Persistent Volumes" >}}

Kubernetes applications often rely on persistent volumes (PVs) and persistent volume claims (PVCs) to manage data. When Replicated creates a Kubernetes appliance, a custom storage class is automatically provisioned that will be available to the application for persistent volumes. No changes are necessary in the application spec, but the Replicated storage class might not have the same characteristics as the cloud provider you are used to.

The biggest difference with the Replicated provisioner is that all PVs created by Replicated will be backed by a `hostPath` on the node. This means that the volume is not relocatable and if the data is specific to the container, it should be labeled to start on the same node each time.
