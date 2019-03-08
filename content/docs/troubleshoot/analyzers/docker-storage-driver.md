---
date: "2018-03-03T04:02:20Z"
title: "Docker Storage Drivers"
description: "An explanation of Troubleshoot Collectors"
weight: "1905"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
aliases: [ /docs/troubleshoot/analyzers ]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Docker Storage Drivers

Not every docker storage driver is compatible with each kernel version, and some storage drivers have additional configuration that is required or recommended to run in a production environment. For example, running a server with the devicemapper storage driver in loopback mode is ok for a test environment or locally, but not recommended in a production setup.

When a server is running with an improperly configuraed storage driver, it might be ok for some time, and start to experience problems at load or after a specific number of containers are running.

The support bundle analyzers look for known incompatible or not-recommended storage driver settings and will report these as errors when detected.
