---
date: "2016-07-03T04:02:20Z"
title: "Add Nodes"
description: "Adding nodes to a Swarm cluster that was deployed with Replicated"
weight: "312"
categories: [ "Distributing a Swarm Application" ]
index: "docs/swarm"
aliases: [docs/distributing-an-application/add-nodes-swarm]
---

When it is necessary to add additional nodes to satisfy the scheduling requirements of an application, Replicated makes it easy for the end customer to add additional Swarm nodes on remote instances to run a distributed application.

On the Cluster page on the Admin Console an "Add Node" button will be visible. This will prompt the end customer with two simple options for adding a node.

### Scripted Installation
The scripted install is the recommended means for adding an additional node to the Swarm cluster. The end customer will be prompted for the private and optionally the public address of the server.

![Add Node Script](/images/post-screens/add-node-swarm-script.png)

### Docker Installation
If a scripted install is not possible, additionally a docker CLI command is provided for adding additional nodes.

![Add Node Docker](/images/post-screens/add-node-swarm-docker.png)