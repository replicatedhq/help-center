---
date: "2016-07-03T04:02:20Z"
title: "Every Component Option"
description: "A an example YAML with every possible options."
weight: "404"
categories: [ "Replicated Scheduler Examples" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
---

## Every Component Option

This is an example YAML using every possible option on the native components specification.

```yaml
components:
  - name: Worker
    tags: ["Worker"]
    conflicts: ["API"]
    cluster: true
    cluster_host_count:
      strategy: autoscale
      min: 1
      max: 10
      threshold_healthy: 2
      threshold_degraded: 1
    host_requirements:
      cpu_cores: 4
      cpu_mhz: 2000
      memory: 4GB
      disk_space: 10GB
    logs:
      max_size: "10m"
      max_files: "3"
    host_volumes:
      - host_path: /tmp/worker
        owner: "0"
        permission: "0600"
        is_ephemeral: "true"
        is_excluded_from_backup: "true"
        min_disk_space: 10GB

    containers:
      - source: replicated
        image_name: worker
        version: 1.0.1
```
