---
date: "2018-03-03T04:02:20Z"
title: "Ship Open Source"
description: "Documentation for installing and supporting your customers."
weight: "40503"
categories: [ "Ship" ]
index: ["docs/ship", "docs"]
gradient: "console"
icon: "replicatedShip"
aliases: [/docs/ship/getting-started/commandline]
---

The [Replicated Ship](https://github.com/replicatedhq/ship#ship) open source tool can be [installed locally](https://github.com/replicatedhq/ship/blob/master/README.md#installation) to manage the initial configuration and updates of a vendor's application for deployment into a customer's existing cluster.

Once Replicated Ship is installed, customers can run [`ship init <app-slug>`](https://github.com/replicatedhq/ship/blob/master/README.md#ship-init) to launch a browser GUI with the configuration lifecycle defined in the ship.yaml. [`ship watch`](https://github.com/replicatedhq/ship/blob/master/README.md#ship-watch) and [`ship update`](https://github.com/replicatedhq/ship/blob/master/README.md#ship-update) can then be run in headless mode to check for updates and render new deployment artifacts when updates are available.
