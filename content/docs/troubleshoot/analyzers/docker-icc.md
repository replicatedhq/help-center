---
date: "2018-03-03T04:02:20Z"
title: "Docker ICC"
description: "An explanation of Troubleshoot Collectors"
weight: "1904"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Docker ICC

Some installations of Docker will disable inter-container communication, preventing containers on the server from communicating with each other over the host networking stack. This is a default setting for enterprise distrubutions such as RedHat Enterprise Linux.

When debugging problems, this might not be obvious, and if ICC is disabled, a message will be displayed in the support bundle analyzers to help make the engineer aware of the fact that inter-container communication will be blocked.

