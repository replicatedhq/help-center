---
date: "2016-07-03T04:02:20Z"
title: "Storage"
description: "Overview of how Persistent Volumes work with Replicated"
keywords: "persistent volumes, cluster, kubernetes"
weight: "2705"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{< linked_headline "Rook" >}}

Replicated's Kubernetes scheduler uses [Rook](https://rook.io/) to dynamically provision storage for Persistent Volume Claims required by Replicated and your app.

{{< linked_headline "Replication" >}}

Replicated's install script will default to creating a cluster backed by the host directory `/opt/replicated/rook`.
Each file in the cluster begins with a single copy, i.e. without replication.
When a new node is added to the cluster, you can edit the Pool custom resource named `replicapool` in the `rook` namespace and configure it to store copies of each file on two separate hosts:

```shell
kubectl -n rook patch pool replicapool --type='json' -p='[{"op": "replace", "path": "/spec/replicated/size", "value": 2}]'
```

{{< linked_headline "Dynamic Provisioning in Cloud Environments" >}}

The [Cloud Controller Manager (CCM)](https://kubernetes.io/docs/concepts/architecture/cloud-controller/) was introduced in Kuberentes 1.6 to offload control loops that integrate with cloud services from the [Kubernetes Controller Manager (KCM)](https://kubernetes.io/docs/concepts/overview/components/#kube-controller-manager).
Three of the four cloud dependent controllers - node, route, and service - have been moved to the Cloud Controller Manager.
A fourth, the volume controller, was replaced with the Flex Volume plugin framework rather than being ported directlly from the KCM to the CCM.
As of Kubernetes 1.10, a newer plugin system, [Container Storage Interface (CSI)](https://github.com/container-storage-interface/spec/blob/master/spec.md) has been designated as the successor to Flex Volumes.
CSI plugins are similar to Flex Volumes but run in pods rather than as binaries on the host.

Replicated is monitoring progress of the CSI framework and may add support for plugins that will dynamically provision volumes such as EBS on AWS.
For now, customers who wish to use EBS volumes with Replicated may choose to mount a volume on each host at `/opt/replicated/rook`, effectively backing Rook with EBS storage.
Alternatively, Rook can be disabled entirely by setting the `storage_provisioner` parameter to 0, which would require sysadmins to manually provision an EBS volume for each of the four Persistent Volume Claims defined by Replicated in addition to any required to run your app.

{{< linked_headline "Troubleshooting" >}}

The [Rook toolbox](https://rook.io/docs/rook/master/toolbox.html) provides a convenient image for monitoring and debugging your Rook cluster. You can run it as a pod in the `rook` namespace and have access to commands such as `ceph status` to check the health of your storage cluster.
