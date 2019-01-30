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

Kubernetes applications often rely on persistent volumes (PVs) and persistent volume claims (PVCs) to manage data.
When Replicated creates a Kubernetes appliance, a custom storage class named `default` is automatically created that will be available to the application for persistent volumes provisioned by [Rook](https://rook.io).
Replicated will set the `storageClassName` on all PersistentVolumeClaims in your application, allowing customers to use an alternative provisioner, such as `standard` on GKE.

{{< linked_headline "Fine-Grained Provisioniong" >}}

Add the `replicated.com/no-rewrite-storage-class` annotation to any PVC or StatefulSet's volumeClaimTemplate to prevent Replicated from rewriting the storageClassName of that volume. You will need to ensure that an alternative storageClassName is set and a provisioner for that class is running in the customer's environment.

{{< linked_headline "Resources" >}}

For more information on using Persistent Volumes with Kubernetes, see the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

For information on snapshotting Kubernetes volumes, see the [Replicated snapshots documentation for Kubernetes](/docs/snapshots/kubernetes/).

For more information on managing the storage needs of Kubernetes in customer environments, see [Managing Storage](/docs/kubernetes/customer-installations/managing-storage/).
