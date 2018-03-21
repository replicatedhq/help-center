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

Replicated can be installed to an existing Kubernetes 1.9 cluster. Use the `https://get.replicated.com/kubernetes-yml-generate` script to generate specs for the Deployments, Services, and PersistentVolumeClaims required by Replicated.

## Persistent Volumes

When deploying to an environment with [dynamic volume provisioning](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/), use the `storage_class` param to set how PersistentVolumeClaims are fulfilled.
You should also disable the Host Path provisioner when specifying a storage class.

```shell
curl -sSL "https://get.replicated.com/kubernetes-yml-generate?storage_class=standard&host_path_provisioner=0" | bash > replicated.yml
kubectl apply -f replicated.yml
```

## Load Balancer

Use the `service_type` param set to LoadBalancer in environments where they can be automatically provisioned.

```shell
curl -sSL "https://get.replicated.com/kubernetes-yml-generate?service_type=LoadBalancer" | bash > replicated.yml
kubectl apply -f replicated.yml
```

## Namespaces

Replicated components are deployed to the `default` namespace and your app is deployed to a separate namespace as `replicated_<app_id>`. To modify the namespace that Replicated components are deployed to, set the `kubernetes_namespace` param. The app namespace is not configurable.

```shell
curl -sSL "https://get.replicated.com/kubernetes-yml-generate?kubernetes_namespace=replicated" | bash > replicated.yml
kubectl apply -f replicated.yml
```

## Node Ports

Existing Kubernetes clusters are unlikely to allow services to bind to node ports outside the 30000-32767 range. To support both Replicated managed Kubernetes and third-party Kubernetes clusters avoid using node ports outside this range.
