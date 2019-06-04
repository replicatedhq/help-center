---
date: "2019-06-04T12:00:00Z"
title: "Devicemapper Loop-LVM"
description: "Docker Devicemapper in loop-lvm Mode custom Troubleshoot Analyzer example"
weight: "2156"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Docker Devicemapper in Loop-LVM Mode

The loop-lvm mode makes use of a ‘loopback’ mechanism that allows files on the local disk to be read from and written to as if they were an actual physical disk or block device. However, the addition of the loopback mechanism, and interaction with the OS filesystem layer, means that IO operations can be slow and resource-intensive. Use of loopback devices can also introduce race conditions. For this reason this configuration is only appropriate for testing.

Below is an example of an anlyzer that can detect when Docker is running with the Devicemapper storage driver in loop-lvm mode.

```yaml
analyze:
  v1:
    - name: docker.devicemapper.isLoopback
      labels:
        iconKey: docker_whale
        desiredPosition: "3"
      insight:
        primary: Devicemapper with loopback
        detail: Docker devicemapper driver in loopback config
        severity: warn
      registerVariables:
        - name: driver
          fileMatch:
            pathRegexps:
              - /docker_info\.json
            regexpCapture:
              regexp: '"Driver": *"([^"]+)"'
              index: 1
        - name: loopback
          fileMatch:
            pathRegexps:
              - /docker_info\.json
            regexpCapture:
              regexp: 'Data loop file'
              index: 0
      evaluateConditions:
        - condition:
            stringCompare:
              eq: devicemapper
            variableRef: driver
        - condition:
            not:
              empty: {}
              variableRef: loopback
          insightOnFalse:
            primary: Devicemapper not in loopback
            detail: Docker devicemapper driver NOT in loopback config
            severity: debug
```
