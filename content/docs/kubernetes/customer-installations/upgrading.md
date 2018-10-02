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

The install script can be re-run to upgrade Replicated to the latest version.
Installations with internet access will automatically be upgraded to the latest `replicated_version` in the `host_requirements` section of your application YAML in versions greater than 2.23.0.

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
