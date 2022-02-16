---
date: "2016-07-03T04:02:20Z"
title: "Install into an Existing Cluster"
description: "Instructions for installing Replicated via the easy install script, manually or behind a proxy. Also includes instructions for uninstalling Replicated."
keywords: "installing, cluster, kubernetes"
weight: "2711"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{<legacynotice>}}

## Existing Cluster Installation
{{< warning title="Airgap Not Supported" >}}
While a Replicated-managed Kubernetes cluster can support airgapped installations, airgapped installs are not supported on existing cluster installations.  If you are looking to deploy your Kubernetes application to primarily existing-cluster environments, we recommend using [Replicated KOTS](https://kots.io) instead.
{{</warning>}}

## Prerequisites

While the Replicated Kubernetes Appliance supports installation into
existing clusters, the wide variations across Kubernetes clusters found
in cloud providers and on-prem datacenters make it impossible to guarantee out-of-the-box compatibility on every Kubernetes cluster.  As mentioned above, if you are primarily targeting existing cluster environments, consider using [Replicated Kots](https://kots.io) instead.
We have a short list of [Prerequisites](#prerequisites) that will evolve as more managed Kuberentes offerings are made available.




Replicated can be installed to an existing Kubernetes 1.9, 1.11 or 1.13 cluster. Use the `https://get.replicated.com/kubernetes-yml-generate` script to generate specs for the Deployments, Services, and PersistentVolumeClaims required by Replicated.

## Persistent Volumes

When deploying to an environment with [dynamic volume provisioning](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/), use the `storage_class` param to set how PersistentVolumeClaims are fulfilled.
You should also disable the Host Path provisioner when specifying a storage class.
All Replicated PVCs will use the specified storage class and all application PVCs will be rewritten with both `storageClassName` field and `volume.beta.kubernetes.io/storage-class` annotation set to the specified parameter.

```shell
curl -sSL "https://get.replicated.com/kubernetes-yml-generate?storage_class=standard&storage_provisioner=0" | bash > replicated.yml
kubectl apply -f replicated.yml
```

## Load Balancer

Use the `service_type` param set to LoadBalancer in environments where they can be automatically provisioned.

```shell
curl -sSL "https://get.replicated.com/kubernetes-yml-generate?service_type=LoadBalancer" | bash > replicated.yml
kubectl apply -f replicated.yml
```

## Namespaces

Replicated components are deployed to the `default` namespace and your app is deployed to a separate namespace as `replicated_<app_id>`.

## Limitations

### Node Ports

Existing Kubernetes clusters are unlikely to allow services to bind to node ports outside the 30000-32767 range. To support both Replicated managed Kubernetes and third-party Kubernetes clusters avoid using node ports outside this range.

### Cluster Admin

In order to manage the cluster from the Replicated pod, the default service account must be bound to the `cluster-admin` role.
The `kubernetes-yml-generate` script will generate yaml for a ClusterRoleBinding for this purpose, but `kubectl` will not be able to apply it unless authenticated as an admin.
Login as an admin when attempting to apply the generated yaml:

```shell
kubectl --username=admin --password=<password> apply -f replicated.yml
```

### Resources

For a single-node cluster 4 CPUs are required to meet the resource requests of all system and replicated pods. More may be required to meet the additional resource requests of your app.

### Kubernetes Version

Ensure the major and minor version of your cluster's server match what is [expected by the version of Replicated being installed](/docs/kubernetes/customer-installations/installing/#compatible-kubernetes-versions)

## Prerequisites

These are the prerequisites that we know are required of a target cluster. This list is not guaranteed to be complete, and will evolve as users install Replicated into additional varieties of managed Kubernetes.

- Cluster must include at least one Node labeled with `replicated.com/daemon`, as in [the appliance installer](https://github.com/replicatedhq/replicated-installer/blob/79b89b5349cd49afc6ed8e4b5d3c03b3f533caef/install_scripts/templates/common/kubernetes.sh#L22).
- Cluster must include a dynamic volume provisioner, and the `storage_class` param [must be provided](#persistent-volumes) to the `kubernetes-yml-generate` script.

