---
date: "2016-07-03T04:02:20Z"
title: "Ingress Controllers"
description: "An overview of the various sections of the Replicated YAML."
weight: "2602"
categories: [ "Packaging a Kubernetes Application" ]
index: "docs/kubernetes"
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{< linked_headline "Ingress Controllers" >}}

If your application contains [Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/), this may require some changes to be compatible with Replicated. Ingress resources are unique in Kubernetes because a cluster must have a functional ingress controller running before an ingress resource type can be deployed.

{{< linked_headline "Ingress in the Cloud" >}}

When running Kubernetes in a cloud provider or in a managed Kubernetes stack such as GKE or Azure Container Service, the cloud provider often deploys and configures an ingress controller into every cluster automatically. These are propietary controllers that make use of the other infrastructure components offered by the cloud provider. For example, a GKE cluster has an ingress controller that will automatically provision a Google Cloud Load Balancer with an external IP address.

{{< linked_headline "Ingress in the Replicated Appliance" >}}

A Kubernetes appliance deployed by Replicated is more portable, and doesn't make any assumptions about externally available resources. To build ingress into an enterprise application, you can either use NodePort (recommend) or ship your own ingress controller.

The [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) explains how to implement nodePort. This is recommended in the Replicated appliance because it's portable and will work on single node Kubernetes installation.

Alternatively, to use an ingress resource in Replicated, you will have to provide your own ingress controller or it will fail to deploy. A portable and common ingress controller can be deployed using nginx, and [examples are found in the official Kubernetes project](https://github.com/kubernetes/ingress-nginx).
