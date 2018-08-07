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

Kubernetes applications often rely on persistent volumes (PVs) and persistent volume claims (PVCs) to manage data. When Replicated creates a Kubernetes appliance, a custom storage class is automatically provisioned that will be available to the application for persistent volumes. No changes are necessary in the application spec, but the Replicated storage class might not have the same characteristics as Kubernetes clusters provisioned by cloud providers

While cloud provisioner Storage Classes will provision block storage on the upstream cloud provider and manage the attachment of block devices as container volumes, persistent volumes using the Replicated Storage Class will be backed by a host path on the node. This volume is not relocatable on the Kubernetes appliance. While the Replicated Appliance is a single-node installation, clusters using the Replicated Storage Class will need to use [Pod Assignments](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/) or [Taints and Tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) to ensure that the pod always runs on the same node.

For more information on using Persistent Volumes with Kubernetes, see the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

For information on snapshotting Kubernetes volumes, see the [Replicated snapshots documentation for Kubernetes](/docs/snapshots/kubernetes/).

For more information on managing the storage needs of Kubernetes in customer environments, see [Managing Storage](/docs/kubernetes/customer-installations/managing-storage/).
