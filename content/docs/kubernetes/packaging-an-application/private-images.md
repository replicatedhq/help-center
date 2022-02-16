---
date: "2019-11-26T04:02:20Z"
title: "Private Images"
description: "Using private images in a Kubernetes application"
weight: "2618"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{<legacynotice>}}

Replicated is capable of delivering private images from the Replicated registry or any supported 3rd party registry into a private cluster.  These images will be hosted on the local network, in the registry distributed with Replicated, and application objects will be re-written to use this registry.

The following objects will be rewritten:

 - apps/v1.DaemonSet
 - apps/v1.Deployment
 - apps/v1.ReplicaSet
 - apps/v1.StatefulSet
 - batch/v1.Job
 - batch/v1beta1.CronJob
 - core/v1.Pod
 - core/v1.ReplicationController
