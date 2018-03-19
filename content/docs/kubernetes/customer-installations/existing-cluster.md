---
date: "2016-07-03T04:02:20Z"
title: "Install into an Existing Cluster"
description: "Instructions for installing Replicated via the easy install script, manually or behind a proxy. Also includes instructions for uninstalling Replicated."
keywords: "installing, cluster, kubernetes"
weight: "2705"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

Replicated can be installed to an existing Kubernetes 1.9 cluster. This example demonstrates deploying Replicated to an environment supporting LoadBalancer services and with an existing StorageClass named Standard to provision storage for PersistentVolumeClaims.

```shell
curl -sSL "https://get.replicated.com/kubernetes-yml-generate?storage_class=standard&host_path_provisioner=0&service_type=LoadBalancer | bash > replicated.yml
kubectl apply -f replicated.yml
```
