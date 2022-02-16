---
date: "2018-03-03T04:02:20Z"
title: "Traceroute"
description: "Example of validating network routing"
weight: "2104"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

{{<legacynotice>}}

# Traceroute

Initiating a traceroute from the remote server to another remote server during support bundle generation is a good way to check on the outbound route used.

```yaml
- docker.run:
    description: Trace route to 1.1.1.1
    output_dir: /commands/traceroute/
    enable_pull: true
    container_create_config:
      Config:
        Cmd:
          - traceroute
          - 1.1.1.1
        Image: 'alpine:latest'
      HostConfig:
        AutoRemove: true
        NetworkMode: host
```
