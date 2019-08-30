---
date: "2016-07-03T04:02:20Z"
title: "Upgrading Replicated"
description: "Instructions for upgrading Replicated"
keywords:  "upgrading, auto-upgrading"
weight: "704"
categories: [ "Distributing a Swarm Application" ]
index: ["docs/swarm", "docs"]
icon: "replicatedDockerSwarm"
gradient: "swarm"
---

Re-run the install script on your master node to upgrade Replicated to the latest version.

```shell
curl -sSL https://get.replicated.com/swarm-init | sudo bash
```

No script needs to be run on your worker nodes.

{{< linked_headline "Upgrading Airgap Installs" >}}

Airgap installations can be upgraded by downloading a newer version of the Replicated release, uncompressing it on your master node, and re-running the install script using the airgap flag. The latest Replicated release can be found at https://s3.amazonaws.com/replicated-airgap-work/replicated.tar.gz.

```shell
tar xzvf replicated.tar.gz
cat ./swarm-init.sh | sudo bash -s airgap
```

Replicated upgrades with the Swarm scheduler do not require application downtime.

{{< linked_headline "Auto-Upgrades" >}}

If your app is [configured for auto-upgrades](/docs/swarm/packaging-an-application/custom-preflight-checks/#auto-upgrading-replicated) Replicated will attempt to upgrade itself whenever the installed app is updated.
