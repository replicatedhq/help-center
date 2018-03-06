---
date: "2016-07-03T04:02:20Z"
title: "Event Component Option"
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
      replicated_vesion: {{< replicated_api_version_current >}}
      docker_version: {{< docker_version_default >}}
      cpu_cores: 4
      cpu_mhz: 2000
      memoery: 4000000
      disk_space: 10000000
    log_options:
      max_size: 1000000
      max_files: 10
    host_volumes:
      - host_path: /tmp/worker
        owner: "0"
        permission: "0600"
        is_ephemeral: "true"
        is_excluded_from_backup: "true"
        min_disk_space: 100000

    containers:
      - source: replicated
        image_name: worker
        version: 1.0.1
        image_key: "01 01 01"
        image_domain: "000"

        when: '{{repl ConfigOptionEquals "use_external_db" "0" }}'
```
