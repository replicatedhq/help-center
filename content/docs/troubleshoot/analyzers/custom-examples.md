---
date: "2019-05-07T12:00:00Z"
title: "Custom Analyzer Examples"
description: "An explanation of Custom Troubleshoot Analyzers"
weight: "1911"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Custom Analyzer Examples

## Config Management

```yaml
analyze:
  v1:
    - name: processes.configmanagement.puppet
      labels:
        iconKey: puppet_logo
        desiredPosition: "10"
      insight:
        primary: Managed By Puppet
        detail: This server is running a Puppet agent
        severity: info
      registerVariables:
        - name: ps
          fileMatch:
            pathRegexps:
              - default/commands/ps/stdout
            regexpCapture:
              regexp: '.+puppet agent .*'
              index: 0
      evaluateConditions:
        - condition:
            regexpMatch:
              regexp: 'puppet agent '
            variableRef: ps
          insightOnFalse:
            primary: No Puppet
            detail: This server is not running a puppet agent
            severity: debug
            labels:
              iconKey: gray_checkmark
    - name: processes.configmanagement.chef
      labels:
        iconKey: chef_logo
        desiredPosition: "10"
      insight:
        primary: Managed By Chef
        detail: This server is running a Chef client
        severity: info
      registerVariables:
        - name: ps
          fileMatch:
            pathRegexps:
              - default/commands/ps/stdout
            regexpCapture:
              regexp: '.+chef-client.*'
              index: 0
      evaluateConditions:
        - condition:
            regexpMatch:
              regexp: 'chef-client'
            variableRef: ps
          insightOnFalse:
            primary: No Chef
            detail: This server is not running a Chef client
            severity: debug
            labels:
              iconKey: gray_checkmark
```

## CPU Cores

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

## Datacenter

```yaml
analyze:
  v1:
    - name: datacenter.aws
      labels:
        iconKey: datacenter_aws
        desiredPosition: "7"
      insight:
        primary: AWS
        detail: This is an AWS instance
        severity: info
      registerVariables:
        - name: publicAddress
          fileMatch:
            pathRegexps:
              - /containers/replicated-operator\.json
              - /inspect/replicated-operator\.json
              - /replicated-operator-inspect\.json
            regexpCapture:
              regexp: '"PUBLIC_ADDRESS=([^"]+)"'
              index: 1
        - name: provider
          whichCloud:
            variableRef: publicAddress
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: publicAddress
        - condition:
            stringCompare:
              eq: aws
            variableRef: provider
    - name: datacenter.gce
      labels:
        iconKey: datacenter_gce
        desiredPosition: "7"
      insight:
        primary: GCE
        detail: This is a GCE instance
        severity: info
      registerVariables:
        - name: publicAddress
          fileMatch:
            pathRegexps:
              - /containers/replicated-operator\.json
              - /inspect/replicated-operator\.json
              - /replicated-operator-inspect\.json
            regexpCapture:
              regexp: '"PUBLIC_ADDRESS=([^"]+)"'
              index: 1
        - name: provider
          whichCloud:
            variableRef: publicAddress
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: publicAddress
        - condition:
            stringCompare:
              eq: gce
            variableRef: provider
    - name: datacenter.azure
      labels:
        iconKey: datacenter_azure
        desiredPosition: "7"
      insight:
        primary: Azure
        detail: This is an Azure instance
        severity: info
      registerVariables:
        - name: publicAddress
          fileMatch:
            pathRegexps:
              - /containers/replicated-operator\.json
              - /inspect/replicated-operator\.json
              - /replicated-operator-inspect\.json
            regexpCapture:
              regexp: '"PUBLIC_ADDRESS=([^"]+)"'
              index: 1
        - name: provider
          whichCloud:
            variableRef: publicAddress
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: publicAddress
        - condition:
            stringCompare:
              eq: azure
            variableRef: provider
    - name: datacenter.unknown
      labels:
        iconKey: datacenter_unknown
        desiredPosition: "7"
      insight:
        primary: Unknown
        detail: Could not determine datacenter location of address {{repl .publicAddress}}.
        severity: debug
      registerVariables:
        - name: publicAddress
          fileMatch:
            pathRegexps:
              - /containers/replicated-operator\.json
              - /inspect/replicated-operator\.json
              - /replicated-operator-inspect\.json
            regexpCapture:
              regexp: '"PUBLIC_ADDRESS=([^"]+)"'
              index: 1
        - name: provider
          whichCloud:
            variableRef: publicAddress
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: publicAddress
          insightOnFalse:
            primary: Unknown
            detail: Could not determine public IP address.
            severity: debug
        - condition:
            not:
              stringCompare:
                in: [aws,gce,azure]
              variableRef: provider
```

## Docker Container Count

```yaml
analyze:
  v1:
    - name: docker.containers.count
      labels:
        iconKey: docker_container
        desiredPosition: "3"
      insight:
        primary: '{{repl .runningContainers}}'
        detail: '{{repl .runningContainers}} containers running'
        severity: info
      registerVariables:
        - name: runningContainers
          fileMatch:
            pathRegexps:
              - /docker_info\.json
            regexpCapture:
              regexp: '"ContainersRunning": *([^",\n]+)'
              index: 1
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: runningContainers
          insightOnFalse:
            primary: "?"
            detail: Could not determine number of running docker containers
            severity: warn
            labels:
              iconKey: no_docker
```

## Docker Devicemapper in Loopback Mode

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

## Docker ICC

```yaml
analyze:
  v1:
    - name: docker.daemon.icc
      labels:
        iconKey: no_docker
        desiredPosition: "3"
      insight:
        primary: No ICC
        detail: Docker Inter-container communication is disabled, app components will be unable to communicate
        severity: error
      registerVariables:
        - name: docker
          fileMatch:
            pathRegexps:
              - /docker_info\.json
            regexpCapture:
              regexp: '"ServerVersion": *"([^"]+)"'
              index: 1
        - name: icc
          fileMatch:
            pathRegexps:
              - /daemon\.json
            regexpCapture:
              regexp: '"icc": *(false)'
              index: 1
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: docker
        - condition:
            stringCompare:
              eq: "false"
            variableRef: icc
          insightOnFalse:
            primary: Docker ICC enabled
            detail: Inter-container communication is enabled
            severity: debug
            labels:
              iconKey: docker_whale
```

## Docker Logging Driver

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

## Docker Version

```yaml
analyze:
  v1:
    - name: docker.version
      labels:
        iconKey: docker_whale
        desiredPosition: "2"
      insight:
        primary: Docker {{repl .version}}
        detail: Docker server version is {{repl .version}}
        severity: info
      registerVariables:
        - name: version
          fileMatch:
            pathRegexps:
              - /docker_info\.json
            regexpCapture:
              regexp: '"ServerVersion": *"([^"]+)"'
              index: 1
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: version
          insightOnFalse:
            primary: "?"
            detail: Could not determine docker version
            severity: warn
            labels:
              iconKey: no_docker
```

## Loadavg

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

## Memory Utilization

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

## OS

```yaml
analyze:
  v1:
    - name: os.ubuntu
      labels:
        iconKey: os_ubuntu
      insight:
        primary: OS is Ubuntu
        detail: Operating System is Ubuntu
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: ubuntu
            variableRef: os
          insightOnFalse:
            primary: OS is not Ubuntu
            detail: Operating System is not Ubuntu
            severity: debug
    - name: os.alpine
      labels:
        iconKey: os_alpine
      insight:
        primary: OS is Alpine
        detail: Operating System is Alpine
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: alpine
            variableRef: os
          insightOnFalse:
            primary: OS is not Alpine
            detail: Operating System is not Alpine
            severity: debug
    - name: os.centos
      labels:
        iconKey: os_centos
      insight:
        primary: OS is CentOS
        detail: Operating System is CentOS
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: centos
            variableRef: os
          insightOnFalse:
            primary: OS is not CentOS
            detail: Operating System is not CentOS
            severity: debug
    - name: os.rhel
      labels:
        iconKey: os_rhel
      insight:
        primary: OS is RHEL
        detail: Operating System is RHEL
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: rhel
            variableRef: os
          insightOnFalse:
            primary: OS is not RHEL
            detail: Operating System is not RHEL
            severity: debug
    - name: os.debian
      labels:
        iconKey: os_debian
      insight:
        primary: OS is Debian
        detail: Operating System is Debian
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: debian
            variableRef: os
          insightOnFalse:
            primary: OS is not Debian
            detail: Operating System is not Debian
            severity: debug
```

## Uptime

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
