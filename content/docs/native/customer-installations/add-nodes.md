---
date: "2017-04-11T00:00:00Z"
title: "Adding Nodes To A Replicated Cluster"
description: "Instructions for installing additional nodes with a Replicated cluster"
weight: "308"
categories: [ "Managing Customer Installation" ]
index: ["docs/native", "docs"]
aliases: [docs/distributing-an-application/add-nodes-replicated,/docs/distributing-an-application/add-nodes/,/docs/native/packaging-an-application/add-nodes/]
icon: "replicatedCircle"
nextPage: "native/examples/overview.md"
---

When an application is configured by the vendor with a clustering strategy, Replicated makes it possible for the end customer to install additional nodes on remote instances to run a distributed application. Installations of Replicated using the [easy installation script](/docs/native/packaging-an-application/installing-via-script/) will install an operator on the local node automatically.

On the Cluster page on the On-Prem Console an "Add Node" button will be visible. This will prompt the end customer with two simple options for adding a node.

### Scripted Installation
The scripted install is the recommended means for adding an additional node to Replicated. The end customer will be prompted for the private and optionally the public address of the server.

![Add Node Script](/images/post-screens/add-node-script.png)

### Docker Installation
If a scripted install is not possible, additionally a docker script is provided for installing additional nodes.

![Add Node Docker](/images/post-screens/add-node-docker.png)
