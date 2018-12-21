---
date: "2016-07-03T04:02:20Z"
title: "Add Nodes"
description: "Adding nodes to a Swarm cluster that was deployed with Replicated"
weight: "708"
categories: [ "Distributing a Swarm Application" ]
index: ["docs/swarm", "docs"]
aliases: [docs/distributing-an-application/add-nodes-swarm]
gradient: "swarm"
icon: "replicatedDockerSwarm"
nextPage: "swarm/examples/overview.md"
---

When it is necessary to add additional nodes to satisfy the scheduling requirements of an application, Replicated makes it easy for the end customer to add additional Swarm worker nodes on remote instances to run a distributed application.

On the Cluster page on the Admin Console an "Add Node" button will be visible. This will prompt the end customer with two simple options for adding a node.

### Scripted Installation
The scripted install is the recommended means for adding an additional node to the Swarm cluster. The end customer will be prompted for the private and optionally the public address of the server.

![Add Node Script](/images/post-screens/add-node-swarm-script.png)

### Docker Installation
If a scripted install is not possible, additionally a docker CLI command is provided for adding additional nodes.

![Add Node Docker](/images/post-screens/add-node-swarm-docker.png)

{{< linked_headline "Configure a Swarm for HA (High Availability)" >}}

Replicated allows for configuring your Swarm to have multiple manager nodes for high availability. See [Docker's website](https://docs.docker.com/engine/swarm/admin_guide/) for additional documentation on high availability in Swarm.


### Add Manager Nodes
Using the same "Add Node" button on the Cluster page of the Admin Console, you can generate a script to add additional manager nodes to the Swarm.

![Add Node Select Type](/images/post-screens/add-node-swarm-select-type.png)

### Convert Existing Worker Nodes to Manager Nodes
Swarm provides an easy way to promote existing worker nodes to manager nodes. See [this guide](https://docs.docker.com/engine/swarm/manage-nodes/#promote-or-demote-a-node) on how to promote a worker node to a manager node.

### Additional Info/Resources
Docker recommends you have an odd number of manager nodes and no more than 7 managers for a Swarm. Additional info on this constraint can be found [here](https://docs.docker.com/engine/swarm/how-swarm-mode-works/nodes/#manager-nodes). When a Swarm has multiple manager nodes, the Swarm [must have a quorum](https://docs.docker.com/engine/swarm/admin_guide/#maintain-the-quorum-of-managers); if that quorum is lost, management tasks cannot be performed.

In the event of a loss of manager nodes, Docker provides documentation on [disaster recovery](https://docs.docker.com/engine/swarm/admin_guide/#recover-from-disaster).

