---
date: "2016-07-03T04:02:20Z"
title: "Upgrading Replicated"
description: "The process for end customers to update Replicated services to access the latest improvements to the underlying system since their installation."
weight: "303"
categories: [ "Managing Customer Installation" ]
index: ["docs/kubernetes", "docs"]
aliases: [/docs/distributing-an-application/upgrading,/tags/upgrading-replicated/,/docs/distributing-an-application/upgrading/]
icon: "replicatedKubernetes"
---

Re-run the install script to upgrade Replicated to the latest version.
```shell
curl -sSL -o install.sh  https://get.replicated.com/kubernetes-init
sudo bash ./install.sh
```

If an upgrade of Kubernetes is required, the script will begin the upgrade and prompt to run upgrade scripts on each node in the cluster.
When upgrading only the Replicated version, the install script will be required to be re-run on only the master.
Applications will have a few minutes of downtime when Kubernetes upgrades are performed.

## Upgrading Airgap Installs
Airgap installations can be upgraded by downloading a newer version of the Replicated release, uncompressing it and re-running the install script using the airgap flag.  The latest Replicated release can be found at
https://s3.amazonaws.com/replicated-airgap-work/replicated.tar.gz.

```shell
tar xzvf replicated__docker__kubernetes.tar.gz
cat ./kubernetes-init.sh | sudo bash -s airgap
```

## Auto-Upgrades
Installations, with internet access, can be configured to automatically update if there is an update available that does not require a change in the version of Kubernetes. Refer to this [compatability table](../installing/#compatible-kubernetes-versions), when configuring your application to auto-upgrade.

Auto-upgrade will automatically upgrade to the latest `replicated_version` in the `host_requirements` section of your application YAML. This feature will only work in replicated versions greater than 2.23.0.
