---
date: "2019-06-04T12:00:00Z"
title: "Docker Logging Driver"
description: "Docker Logging Driver custom Troubleshoot Analyzer example"
weight: "2158"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Docker Logging Driver

The `docker logs` command is quite useful for debugging purposes and is also required for the Replicated Troubleshoot product to collect logs from Docker containers. The `docker logs` command is only supported when the logging driver is configured as `json-file` or `journald`. Below is an example of an analyzer that will parse the output of the `docker info` command warn if the Docker logging driver is configured to be anything other than those two.

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
