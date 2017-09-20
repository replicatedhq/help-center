---
date: "2016-07-03T04:02:20Z"
title: "Add Nodes"
description: "When a Replicated-orchestrated application is configured with a clustering strategy, additional nodes can be installed on remote instances to take part in the cluster."
weight: "305"
categories: [ "Distributing an Application" ]
index: "docs"
similar: ["docs/distributing-an-application/add-nodes-replicated.md", "docs/distributing-an-application/add-nodes-swarm.md"]
tags: ["Schedulers", "Airgapped Environment", "Nodes"]
---

The instructions to add additional nodes are different depending the running scheduler.

### Replicated Scheduler
To add additional nodes when running on the Replicated scheduler, refer to the instructions on the /cluster page of the Admin Console. For details, visit the [instructions for adding additional Replicated nodes](/docs/distributing-an-application/add-nodes-replicated).

### Swarm Scheduler
To add additional nodes when running on the Swarm scheduler, refer to the instructions on the /cluster page of the Admin Console. For details, visit the [instructions for adding additional Swarm nodes](/docs/distributing-an-application/add-nodes-swarm).

## Airgapped Installations
When adding a remote node in an airgapped installation, each node will require that Docker is already installed. When adding a node via the easy installation method, the Replicated airgap archive must be copied over manually to the remote node. The archive can be downloaded [here](/docs/distributing-an-application/airgapped-installations/#install-replicated).