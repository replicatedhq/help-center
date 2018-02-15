---
date: "2017-04-17T00:00:00Z"
title: "Adding Nodes To A Swarm Cluster"
description: "Instructions for installing additional nodes with a Swarm cluster"
keywords: "installing, swarm"
index: "docs"
hideFromList: true
tags: ["Nodes", "Clusters"]
categories: [ "Distributing an Application" ]
similar: ["docs/distributing-an-application/add-nodes-replicated.md", "docs/distributing-an-application/add-nodes.md"]
---

When it is necessary to add additional nodes to satisfy the scheduling requirements of an application, Replicated makes it easy for the end customer to add additional Swarm nodes on remote instances to run a distributed application.

On the Cluster page on the Admin Console an "Add Node" button will be visible. This will prompt the end customer with two simple options for adding a node.

### Scripted Installation
The scripted install is the recommended means for adding an additional node to the Swarm cluster. The end customer will be prompted for the private and optionally the public address of the server.

![Add Node Script](/images/post-screens/add-node-swarm-script.png)

### Docker Installation
If a scripted install is not possible, additionally a docker CLI command is provided for adding additional nodes.

![Add Node Docker](/images/post-screens/add-node-swarm-docker.png)