---
date: "2019-06-04T12:00:00Z"
title: "CPU Cores"
description: "CPU Cores custom Troubleshoot Analyzer example"
weight: "2154"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# CPU Cores

It is often the case that there is a minimum number of processors required to run a software application. Below is an example of analyzing the `/proc/cpuinfo` file to determine the number of cores available on a single host.

```yaml
analyze:
  v1:
    - name: cpucores.usage
      labels:
        iconKey: os_cpu
        desiredPosition: "1"
      insight:
        primary: '{{repl .numproc}}'
        detail: Number of CPU Cores is {{repl .numproc}}
        severity: info
      registerVariables:
        - name: numproc
          cpuCores: {}
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: numproc
          insightOnFalse:
            primary: Unknown
            detail: Could not determine number of CPU Cores. Ensure your specs include a command os.read-file["/proc/cpuinfo"].
            severity: debug
```
