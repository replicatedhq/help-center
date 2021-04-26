---
date: "2018-10-01T04:02:20Z"
title: "Rook + Ceph"
description: "Storage in embedded clusters"
weight: "2510"
categories: [ "Shipping With Kubernetes on Replicated" ]
index: ["docs/kubernetes", "docs"]
icon: "replicatedKubernetes"
gradient: "kubernetes"
nextPage: "kubernetes/packaging-an-application/yaml-format.md"
---

{{<kotsdocs>}}
To use Rook with KOTS, check out the [kurl.sh Rook add-on docs](https://kurl.sh/docs/add-ons/rook).
{{</kotsdocs>}}

Replicated selected [Ceph](https://ceph.io) block storage managed by [Rook](https://rook.io) as the default provisioner for `PersistentVolumeClaims` in embedded Kubernetes clusters.
The reliability of Ceph along with the operational simplicity of Rook offers a number of advantages.

## Dynamic Cluster Scaling

All Replicated embedded clusters begin with a single node, but users can add or delete nodes from the cluster at any time.
Replicated requires a distributed storage system that can dynamically respond to these changes in the cluster topology.
Ceph's [CRUSH map](https://access.redhat.com/documentation/en-us/red_hat_ceph_storage/3/html/storage_strategies_guide/crush_administration#introducing_crush) maintains a tree of all storage locations in the cluster and automatically re-balances data when these changes occur.
This re-balancing is proportional to the changes in the cluster - scaling from 10 nodes to 9 or 11 will only require moving ~10% of all data.

## Fault Tolerant

Replicated automatically increases the replication factor of pools as nodes are added to the cluster (up to a maximum of 3).
If a node is temporarily unavailable the cluster will continue servicing requests uninterrupted.
If a node is permanently lost, the cluster will automatically re-balance using other copies of the lost data to return to the desired replication factor within minutes.

## Thinly Provisioned

Different users may consume widely different amounts of storage for the same application.
Because Ceph is thinly provisioned, application developers can specify the maximum possible storage size for their PVCs without requiring all end users have that much disk space available.

## Rook

Rook is the most mature framework for managing Ceph in a Kubernetes cluster.
Most of the tasks traditionally required of ceph administrators, such as handling monitor failover, have been automated by the Rook operator.
Rook services requests from the Kubernetes API and from kubelets on each node, allowing application devlopers to write standard Kubernetes yaml for Volumes and PersistentVolumeClaims.

## Relocatable

Rook allows Pods consuming PersistentVolumes to be re-scheduled to different nodes without data loss.
The data in the PersistentVolumes continues to be served directly from OSDs regardless of where the Pod is scheduled - there is no warm-up period needed to create a local cache on the new node.

## Open-Source

Rook and Ceph are available under permissive licenses and are [backed](https://ceph.io/foundation/) by [vibrant](https://github.com/rook/rook) [open-source](https://github.com/ceph/ceph) [communities](https://ceph.io/community/).
