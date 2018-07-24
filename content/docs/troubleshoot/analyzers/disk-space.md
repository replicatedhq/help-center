---
date: "2018-03-03T04:02:20Z"
title: "Disk Pressure"
description: "An explanation of Troubleshoot Collectors"
weight: "1904"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Disk Pressure

One of the most common causes of service outages on appliances is running out of disk space. If a server is low on disk space, the analyzers will show a warning message and make this visible and easy to detect.

On a Replicated server, this will be reported when the root mount of the Replicated container has less than 1 GB of free space or when the /tmp direectory doesn't have at least 1 GB of free space.
