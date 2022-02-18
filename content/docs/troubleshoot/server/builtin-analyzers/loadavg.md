---
date: "2019-06-04T12:00:00Z"
title: "Load Average"
description: "Load Average custom Troubleshoot Analyzer example"
weight: "2160"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

{{<legacynotice>}}

# Load Average

High load average can often be the cause of your application behaving improperly or performing poorly. Below is an example of an analyzer that will parse the `/proc/loadavg` file and display the load average of the host over 1, 5 and 15 minutes in human readable format.

```yaml
analyze:
  v1:
    - name: os.loadavg
      labels:
        iconKey: os_loadavg
        desiredPosition: "8"
      insight:
        primary: '{{repl .loadavg1 | printf "%.2f"}} {{repl .loadavg5 | printf "%.2f"}} {{repl .loadavg15 | printf "%.2f"}}'
        detail: CPU load averages over 1, 5, and 15 minutes
        severity: info
      registerVariables:
        - name: loadavg
          loadavg: {}
        - name: loadavg1
          loadavg1: {}
        - name: loadavg5
          loadavg5: {}
        - name: loadavg15
          loadavg15: {}
      evaluateConditions:
        - condition:
            and:
              - not:
                  empty: {}
                  variableRef: loadavg1
              - not:
                  empty: {}
                  variableRef: loadavg5
              - not:
                  empty: {}
                  variableRef: loadavg15
          insightOnFalse:
            primary: Unknown
            detail: Could not determine loadavg. Ensure your specs include the command `os.loadavg`.
            severity: debug
```
