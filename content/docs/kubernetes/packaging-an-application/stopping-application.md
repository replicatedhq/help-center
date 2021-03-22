---
date: "2019-11-26T04:02:20Z"
title: "Stopping the Application"
description: "Starting and stopping the application"
weight: "2619"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{<kotsdocs>}}
For KOTS documentation, check out [kots.io](https://kots.io/vendor).
{{</kotsdocs>}}

Once application YAML is applied to the cluster and the application is running, the user will have the ability to stop the application from the Replicated Admin dashboard or using the replicated CLI.  The application is stopped by scaling the number of replicas to 0 on certain Kubernetes objects and deleting others.

The following objects will be scaled:

 - apps/v1.Deployment
 - apps/v1.ReplicaSet
 - apps/v1.StatefulSet
 - core/v1.ReplicationController

 The following objects will be deleted:

 - apps/v1.DaemonSet
 - batch/v1beta1.CronJob
