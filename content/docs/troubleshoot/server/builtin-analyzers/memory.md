---
date: "2019-06-04T12:00:00Z"
title: "Memory Utilization"
description: "Memory Utilization custom Troubleshoot Analyzer example"
weight: "2161"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

{{<legacynotice>}}

# Memory Utilization

It is often the case that there is a minimum amount of total memory required to run a software application. Below is an example of an analyzer that will parse the `/proc/meminfo` file and display the available and total memory of the host.

```yaml
analyze:
  v1:
    - name: memory.usage
      labels:
        iconKey: os_memory
        desiredPosition: "6"
      insight:
        primary: '{{repl round .memoryUsagePercent 0 | printf "%.0f"}}%'
        detail: '{{repl sub .memoryUsageTotal .memoryUsageAvailable | float64 | humanSize}} memory used of {{repl .memoryUsageTotal | humanSize}}'
        severity: warn
      registerVariables:
        - name: memoryUsageAvailable
          memoryUsageAvailable: {}
        - name: memoryUsageTotal
          memoryUsageTotal: {}
        - name: memoryUsagePercent
          eval: '{{repl if and .memoryUsageAvailable .memoryUsageTotal}}{{repl divFloat (subFloat .memoryUsageTotal .memoryUsageAvailable) .memoryUsageTotal | mulFloat 100}}{{repl end}}'
      evaluateConditions:
        - condition:
            and:
              - not:
                  empty: {}
                  variableRef: memoryUsageAvailable
              - not:
                  empty: {}
                  variableRef: memoryUsageTotal
          insightOnFalse:
            primary: Unknown
            detail: Could not determine memory usage. Ensure your specs include a command os.read-file["/proc/meminfo"].
            severity: debug
        - condition:
            numberCompare:
              gt: 90
            variableRef: memoryUsagePercent
          insightOnFalse:
            primary: '{{repl round .memoryUsagePercent 0 | printf "%.0f"}}%'
            detail: '{{repl sub .memoryUsageTotal .memoryUsageAvailable | float64 | humanSize}} memory used of {{repl .memoryUsageTotal | humanSize}}'
            severity: info
```
