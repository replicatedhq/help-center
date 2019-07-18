---
date: "2019-06-04T12:00:00Z"
title: "Uptime"
description: "Uptime custom Troubleshoot Analyzer example"
weight: "2163"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Uptime

Below is an example of an analyzer that will parse the `/proc/uptime` file and display uptime of the host in human readable format.

```yaml
analyze:
  v1:
    - name: os.uptime
      labels:
        iconKey: os_uptime
        desiredPosition: "7"
      insight:
        primary: '{{repl .osUptime | seconds | humanDuration}}'
        detail: '{{repl .osUptime | seconds | humanDuration}} total uptime since last boot'
        severity: info
      registerVariables:
        - name: osUptime
          osUptime: {}
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: osUptime
          insightOnFalse:
            primary: Unknown
            detail: Could not determine uptime. Ensure your specs include a command `os.uptime`.
            severity: debug
```
