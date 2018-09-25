---
date: "2018-07-17T00:00:00Z"
title: "AKA Architecture Overview"
description: "How Replicated installs Kubernetes on the workstation"
weight: "2710"
categories: [ "Managing Customer Installation" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
aliases: []
---

This page is designed to give a high-level, step-by-step overview of the Replicated AKA installation architecture

### Kubeadm

### Persistent Volumes (PV) with Rook
When Replicated creates a Kubernetes appliance, a custom storage class named `default` is automatically created that will be available to the application for persistent volumes provisioned by [Rook](https://rook.io)

Rook is designed to run as a native Kubernetes service. It offers storage for your Kubernetes app through persistent volumes.

Replicated will set the `storageClassName` on all PersistentVolumeClaims in your application, allowing customers to use an alternative provisioner, such as `standard` on GKE

### Networking with Weave
Replicated uses [Weave](https://www.weave.works/docs/net/latest/kubernetes/kube-addon/) to assign IP addresses to pods and connect them across multiple hosts. Weave runs as a DaemonSet in the `kube-system` namespace and includes a controller to support [Network Policy](https://kubernetes.io/docs/concepts/services-networking/network-policies/) resource types

### Airgap

### Create service account

### Setup cluster
