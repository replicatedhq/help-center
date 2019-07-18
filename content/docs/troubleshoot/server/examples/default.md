---
date: "2019-06-10T12:00:00Z"
title: "Default Spec"
description: "Replicated Troubleshoot default spec."
weight: "2103"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

### Default Spec

A good place to start is with our default spec, which is useful when troubleshooting a Replicated application. It's recommended to add your own application specs to this.

```yaml
collect:
  v1:
    # docker
    - docker.info:
        output_dir: /docker/info
    - docker.ps:
        output_dir: /docker/ps
        All: true
    - os.read-file:
        output_dir: /docker/daemon
        description: docker daemon json
        filepath: /etc/docker/daemon.json

    # system
    - os.loadavg:
        output_dir: /os/loadavg
    - os.hostname:
        output_dir: /os/hostname
    - os.uptime:
        output_dir: /os/uptime
    - os.run-command:
        output_dir: /os/df
        name: df
        args:
          - -h
          - --total
    - os.run-command:
        output_dir: /os/proc/meminfo
        name: cat
        args:
          - /proc/meminfo
    - os.run-command:
        output_dir: /os/proc/cpuinfo
        name: cat
        args:
          - /proc/cpuinfo
    - os.run-command:
        output_dir: /os/ps
        name: ps
        args:
          - auwwf

    # networking & firewall
    - os.read-file:
        output_dir: /os/system/iptables
        description: iptables sysconfig settings
        filepath: /etc/sysconfig/iptables
    - os.read-file:
        output_dir: /os/system/iptables
        description: iptables sysconfig settings
        filepath: /etc/sysconfig/iptables-config
    - os.read-file:
        output_dir: /os/system/iptables
        description: iptables sysconfig settings
        filepath: /etc/sysconfig/ip6tables
    - os.read-file:
        output_dir: /os/system/firewalld/usr-lib
        description: firewalld settings
        filepath: /usr/lib/FirewallD
    - os.read-file:
        output_dir: /os/system/firewalld/etc
        description: firewalld settings
        filepath: /etc/firewalld

    # DNS
    - os.read-file:
        output_dir: /os/system/dns
        description: DNS resolv.conf
        filepath: /etc/resolv.conf
    - os.read-file:
        output_dir: /os/system/dns
        description: dnsmasq.conf
        filepath: /etc/dnsmasq.conf
    - os.read-file:
        output_dir: /os/system/dns/
        description: dhcp3 dhclient.conf
        filepath: /etc/dhcp3/dhclient.conf

    # Container logs
    - docker.container-inspect:
        output_dir: /replicated/inspect
        container_list_options:
          All: true
          Filters:
            name:
              - "replicated"
              - "retraced"
              - "premkit"
              - "studio"

    - docker.logs:
        output_dir: /replicated/logs
        container_list_options:
          All: true
          Filters:
            name:
              - "replicated"
              - "retraced"
              - "premkit"
              - "studio"


    - docker.stack-service-logs:
        output_dir: /replicated/stacks/replicated/service-logs
        description: Logs from services in the replicated stack
        namespace: replicated
    - docker.stack-service-logs:
        output_dir: /replicated/stacks/replicated-retraced/logs
        description: Logs from services in the retraced stack
        namespace: replicated-retraced
    - docker.stack-service-logs:
        output_dir: /replicated/stacks/replicated-premkit/logs
        description: Logs from services in the premkit stack
        namespace: replicated-premkit
    - docker.stack-service-logs:
        output_dir: /replicated/stacks/replicated-statsd/logs
        description: Logs from services in the statsd stack
        namespace: replicated-statsd

    # kubernetes

    - journald.logs:
        unit: kubelet
        reverse: true
        output_dir: /kubernetes/internal/logs/kubelet

    - docker.logs:
          description: >-
            The docker logs for all the containers labeled with
            io.kubernetes.pod.namespace=kube-system
          output_dir: /kubernetes/internal/logs/kube-system
          timeout_seconds: 100
          container_list_options:
            All: true
            Filters:
              label:
                - io.kubernetes.pod.namespace=kube-system
          container_logs_options:
            Timestamps: false

    - docker.ps:
          description: >-
            The docker inspect for all the containers labeled with
            io.kubernetes.pod.namespace=kube-system
          output_dir: /kubernetes/internal/inspect/kube-system
          timeout_seconds: 100
          All: true
          Filters:
            label:
              - io.kubernetes.pod.namespace=kube-system

    - docker.logs:
          description: >-
            Rook container logs
          output_dir: /kubernetes/internal/logs/rook
          timeout_seconds: 100
          container_list_options:
            All: true
            Filters:
              label:
                - io.kubernetes.pod.namespace=rook
          container_logs_options:
            Timestamps: false

    - docker.ps:
          description: >-
            Rook containers
          output_dir: /kubernetes/internal/inspect/rook
          timeout_seconds: 100
          All: true
          Filters:
            label:
              - io.kubernetes.pod.namespace=rook

    - os.http-request:
          output_dir: /kubernetes/internal/metrics/etcd
          url: 'http://localhost:2379/metrics'
          method: get

    - kubernetes.resource-list:
        output_dir: /kubernetes/resources/jobs
        kind: jobs
        namespace: ""
    - kubernetes.resource-list:
        output_dir: /kubernetes/resources/deployments
        kind: deployments
        namespace: ""
    - kubernetes.resource-list:
        output_dir: /kubernetes/resources/pods
        kind: pods
        namespace: ""
    - kubernetes.resource-list:
        output_dir: /kubernetes/resources/events
        kind: events
        namespace: ""

```
