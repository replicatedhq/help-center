---
date: "2018-03-03T04:02:20Z"
title: "Config Management Software"
description: "An explanation of Troubleshoot Collectors"
weight: "1902"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
aliases: [ /docs/troubleshoot/analyzers ]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Configuration Management Software

Popular configuration management tools such as Chef, Puppet and Ansible are used to help management large numbers of servers using automation.

When setting up a server, especially an appliance, it's important to have the server running with known-compatible software and dependencies. When an appliance is provisioned in an environment, occaisionally these configuration management tools will run and attempt to bring all of the software to known versions to match other servers in the environment. This can sometimes cause changes made locally to be reverted later.

The support bundle analyzers will detect if Chef or Puppet agents are installed and configured, and surface this as informational. It's important to know this when troubleshooting a server becasuse manual changes may not be possible.

