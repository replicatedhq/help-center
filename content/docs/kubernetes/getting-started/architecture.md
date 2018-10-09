---
date: "2018-10-01T04:02:20Z"
title: "Architecture"
description: "Overview of the Kubernetes cluster installed by Replicated"
weight: "2509"
categories: [ "Shipping With Kubernetes on Replicated" ]
index: ["docs/kubernetes", "docs"]
icon: "replicatedKubernetes"
gradient: "kubernetes"
nextPage: "kubernetes/packaging-an-application/yaml-format.md"
---

The Replicated Kubernetes installer builds on [kubeadm](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/), adding support for Pod networking, relocatable Persistent Volumes, and Ingress.

## Core Components
Replicated's install script will first install Docker and a few binaries on the host: `kubelet`, `kubeadm`, and `kubectl`.
The `kubelet` binary runs as a systemd service, while `kubeadm` and `kubectl` commands are run manually.
Replicated then delegates to `kubeadm init` to bootstrap the cluster.
All system services besides `kubelet` run as pods in the `kube-system` namespace, including the Kubernetes API Server, Kube Proxy, Etcd, Kube Controller Manager, the Kube Scheduler, and CoreDNS.

## Networking

Replicated adds a Weave DaemonSet to the `kube-system` namespace to provide pod networking on every node in the cluster.
Weave places a binary in `/opt/cni/bin` that fulfills the [CNI](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/#cni) interface, which ensures that every pod is assigned an IP address that is routeable across the cluster.
The Weave DaemonSet includes a Network Policy Controller to support [NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/) resources in the cluster.
All traffic between hosts is [encrypted by default](/docs/kubernetes/customer-installations/networking/#encryption).

## Storage

Replicated installs the [Rook Operator](https://rook.io/) in the `rook-ceph-system` namespace, which manages the ceph storage system.
Then Replicated creates a Ceph cluster by creating a [Cluster](https://rook.io/docs/rook/v0.8/ceph-cluster-crd.html) config in the `rook-ceph` namespace.
Replicated configures the cluster to use the `/opt/replicated/rook` directory on all nodes automatically.
Finally, a [Pool](https://rook.io/docs/rook/v0.8/ceph-pool-crd.html) is created to provide block storage backed by the cluster for PersistentVolumeClaims.
This Pool does not provide replication by default, but can be [configured to allow the cluster to recover from the loss of a node](https://help.replicated.com/guides/ship-with-kubernetes/managing-storage/#replication).

## Ingress

Replicated adds a [Contour](https://github.com/heptio/contour) [ingress controller](/docs/kubernetes/packaging-an-application/ingress/) to the `heptio-contour` namespace. This controller listens on ports 80 and 443 of every node.

## Replicated

After a Kubernetes cluster has been brought up, a Deployment is created in the default namespace for Replicated. When a license is uploadaed, Replicated will generate a namespace for the application and apply the release yaml to it. There are three cases in which Replicated will directly modify application config yaml:

1. If running in airgap mode, all Pod images will be rewritten to pull from the registry running in the Replicated daemon pod.
2. If a pod mounts a Persistent Volume that is included in snapshots, Replicated will add a sidecar to the pod to backup the contents.
3. All PersistentVolumeClaims will receive the `storageClassName` property to ensure they are automatically provisioned by Rook.
