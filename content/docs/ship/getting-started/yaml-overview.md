---
date: "2018-03-03T04:02:20Z"
title: "YAML Overview"
description: "An overview of Ship"
weight: "40010"
categories: [ "Ship" ]
index: ["docs/ship", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Replicated Ship YAML Overview" >}}

There are many artifacts, assets, and configs that are required to install and configure a modern application. Replicated Ship requires a single YAML file that defines all of the objects that are needed to install an application.

The Ship YAML has three distinct top-level sections:

### Assets
The assets section defines all of the public and private assets that are required to be available to start an application. Replicated Ship provides functionality to securely deliver all assets to licensed customers.

The format of the assets specification is fully documented in the [Assets](../../assets/asset-types) documentation.


### Lifecycle
The lifecycle section defines the custom messages and steps that will be displayed or enforced during installation and update of the application.

The format of the lifecycle specification is fully documented in the [Lifecycle](../../lifecycle/overview) documentation.

### Config
The config section defines the values that are calculated or input by the person installing the application. The config is required, regardless of the method being used to install the application (CLI, Web UI, Automation).

The format of the config specification is fully documented in the [Config](../../config/overview) documentation.
