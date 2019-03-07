---
date: "2016-07-03T04:02:20Z"
title: "Creating Collectors"
description: "Creating Custom Troubleshoot Collectors"
weight: "1603"
categories: [ "Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Creating Custom Collectors

The contents of a support bundle is controlled by the list of custom collectors that are supplied. While there's a lot of defaults, it's recommended that you add to these and create a set of custom collectors to include application logs and specific data that's useful when troubleshooting application-level problems.

Custom collectors are defined as a YAML document in the [Vendor Portal](https://vendor.replicated.com/troubleshoot/collectors), and promoted to release channels. For more information about how to promote, read the [documentation on promoting collectors](../promoting-collectors).

## Collector Document

The simplest collector definition (defining no collectors), is:

```yaml
collect:
  v1: []
```

## Adding Collectors

To add custom collectors, start by appending each collector to the v1 array in the document above. A [full list of available collector types is documented in the reference docs](/api/support-bundle-yaml-specs/shared/). Each collector supports various attributes, and these are documented on the collector reference page.

To illustrate how to use thisl let's add a custom collector spec that will include the logs from an api pod running in Kubernetes. This isn't a single pod, but it's a deployment with a label, and the support bundle should contain the logs from all replicas.

The command that could be executed manually to retrieve these logs is:

```shell
$ kubectl logs -l app=api
```

There's a [kubernetes-logs](/api/support-bundle-yaml-specs/kubernetes-logs/) collector that we will use to add this same output to the support bundle. The collector spec is:

```yaml
kubernetes.logs:
  output_dir: /kubernetes/api-pod-logs
  namespace: default
  pod_log_options:
    timestamps: true
    sinceSeconds: 1000000
    limitBytes: 1000000000
  list_options:
    labelSelector: app=api
  timeout_seconds: 30
```

(The details of those fields is out of the scope of this document, but are described in detail on the [kubernetes-logs](/api/support-bundle-yaml-specs/kubernetes-logs/) reference doc.

Appending this to the collector spec, we now have:

```yaml
collect:
  v1:
    - kubernetes.logs:
        output_dir: /kubernetes/api-pod-logs
        namespace: default
        pod_log_options:
          timestamps: true
          sinceSeconds: 1000000
          limitBytes: 1000000000
        list_options:
          labelSelector: app=api
        timeout_seconds: 30
```

Additional collectors can be added the same way. There's no limit to the number of collectors you can add.

### Default spec

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
