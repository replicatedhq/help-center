---
date: "2016-07-03T04:02:20Z"
title: "Adding Nodes"
description: "Instructions for adding a node to an existing cluster"
keywords: "installing, cluster, kubernetes"
weight: "2707"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

When an application is configured by the vendor with a clustering strategy, Replicated makes it possible for the end customer to install additional nodes on remote instances to run a distributed application.

On the Cluster page on the On-Prem Console an "Add Node" button will be visible. This will prompt the end customer with an option for adding a node.

The join script will add Docker and all dependencies for a worker node in a Kubernetes cluster, then join the cluster through the master node.

![Add Node Script](/images/post-screens/add-node-k8s.png)
