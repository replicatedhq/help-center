---
date: "2018-03-03T04:02:20Z"
title: "Managing Customer Installations"
description: "Documentation for installing and supporting your customers."
weight: "40502"
categories: [ "Ship" ]
index: ["docs/ship", "docs"]
gradient: "console"
hideFromList: true
icon: "replicatedShip"
---

Customers can deploy a Replicated Ship application with the Ship Open Source command-line tool, or the Ship Cloud hosted service. With either tool, the process is similar. The customer steps through the UI defined by the Ship YAML, setting any necessary configuration options. Once this is complete, Ship will render the deployable assets (typically Kubernetes yaml), which the customer can then deploy to their cluster using their preferred deployment method. The customer's configuration choices made during the `ship init` process will be preserved, for any subsequent updates.

