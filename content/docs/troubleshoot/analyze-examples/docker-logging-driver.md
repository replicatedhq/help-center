---
date: "2019-06-04T12:00:00Z"
title: "Docker Logging Driver"
description: "Docker Logging Driver custom Troubleshoot Analyzer example"
weight: "2158"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Docker Logging Driver

TODO

```yaml
analyze:
  v1:
    - name: docker.loggingDriver.isJsonFile
      labels:
        iconKey: no_logs
        desiredPosition: "3"
      insight:
        primary: Non json-file log driver
        detail: Logging driver is not json-file or journald, cannot collect container logs
        severity: warn
      registerVariables:
        - name: driver
          fileMatch:
            pathRegexps:
              - /docker_info\.json
            regexpCapture:
              regexp: '"LoggingDriver": *"([^"]+)"'
              index: 1
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: driver
        - condition:
            not:
              stringCompare:
                in: [json-file,journald]
              variableRef: driver
          insightOnFalse:
              primary: json-file/journald
              detail: Logging driver is json-file or journald
              severity: debug
              labels:
                iconKey: logs
```
