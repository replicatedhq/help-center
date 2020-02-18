---
date: "2016-07-03T04:02:20Z"
title: "Upgrading Replicated"
description: "The process for end customers to update Replicated services to access the latest improvements to the underlying system since their installation."
weight: "2713"
categories: [ "Manage Customer Installation" ]
index: ["docs/kubernetes", "docs"]
aliases: [/docs/distributing-an-application/upgrading,/tags/upgrading-replicated/,/docs/distributing-an-application/upgrading/]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

Re-run the install script to upgrade Replicated to the latest version.
```shell
curl -sSL -o install.sh  https://get.replicated.com/kubernetes-init
sudo bash ./install.sh
```

If an upgrade of Kubernetes is required, the script will begin the upgrade and prompt to run upgrade scripts on each node in the cluster.
When upgrading only the Replicated version, the install script will be required to be re-run on only the master.
Because not all nodes are upgraded at the same time, application developers can ensure that downtime is minimized.   This can be achieved by ensuring that pods with multiple replicas are not scheduled on the same nodes (via pod anti-affinity rules) and also by setting up disruption budgets that ensure that the minimum number of replicas required for the application to function is always running.  There are networking considerations as well.  While a node is updated it will not be able to receive network connections.  This should be handled by load balancers or application level failover.

## Upgrading Airgap Installs
Airgap installations can be upgraded by downloading a newer version of the Replicated release, uncompressing it and re-running the install script using the airgap flag.  The latest Replicated release can be found at
https://s3.amazonaws.com/replicated-airgap-work/replicated__docker__kubernetes.tar.gz.

```shell
tar xzvf replicated__docker__kubernetes.tar.gz
cat ./kubernetes-init.sh | sudo bash -s airgap
```

## Auto-Upgrades
Installations, with internet access, can be configured to automatically update if there is an update available that does not require a change in the version of Kubernetes. Refer to this [compatability table](../installing/#compatible-kubernetes-versions), when configuring your application to auto-upgrade.

Auto-upgrade will automatically upgrade to the latest `replicated_version` in the `host_requirements` section of your application YAML. This feature will only work in replicated versions greater than 2.23.0.
