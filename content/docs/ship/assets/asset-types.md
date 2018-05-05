---
date: "2018-05-02T01:19:20Z"
title: "Asset Types"
description: "Types of assets available in Ship"
weight: "41002"
categories: [ "Ship Assets" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Replicated Ship Asset Types" >}}

Replicated Ship will securely delivery all assets required to run an application, when they are defined in the YAML file. Ship supports two asset types:

#### Inline

The [inline asset type](../inline) are text files that will be templated, and then output in the final part of the lifecycle. This is useful when needing to deploy shell scripts, text files, or YAML manifests.

#### Docker

The [docker asset type](../docker) can deliver Docker images, both private and public, to the workstation to prepare for installation. This is a useful way to include Docker images that will work in airgapped environments.