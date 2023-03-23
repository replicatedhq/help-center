---
date: "2016-07-07T04:02:20Z"
title: "Docker Swarm"
description: "Configuring Snapshots on Docker Swarm"
weight: "2205"
categories: [ "Snapshots" ]
index: "other"
aliases: [/docs/packaging-an-application/swarm-snapshots/,/docs/swarm/packaging-an-application/snapshots/]
---

{{<legacynotice>}}

{{< linked_headline "Snapshots with Docker Swarm" >}}

Any volumes holding your application data can be included in snapshots by listing them under the `backup` section in your config. Replicated will check all nodes in your cluster for volumes with a matching name and include them in your snapshot.

```yaml
---
# kind: replicated

replicated_api_version: 2.17.0
name: "Swarm"

admin_commands:
  - alias: backup-redis-to-rdb
    command: [redis-cli, bgsave]
    run_type: exec
    service: redis
  - alias: mv-backup-rdb-to-safe-place
    command: [mv, /data/dump.rdb, /backup/dump.rdb]
    run_type: exec
    service: redis

backup:
  enabled: true
  script: |
    #!/bin/sh
    replicated admin backup-redis-to-rdb
    replicated admin mv-backup-rdb-to-safe-place
  swarm:
    volumes: [ "redis-backup-data" ]

---
# kind: scheduler-swarm
version: "3"

services:
  redis:
    image: redis:3.2-alpine
    ports:
      - "6379"
    volumes:
      - redis-data:/data
      - redis-backup-data:/backup

volumes:
  redis-data:
  redis-backup-data:
```

{{< linked_headline "Multi-strategy Snapshots with Docker Swarm" >}}

[Multi-strategy snapshots](/docs/snapshots/custom-scripts/#multi-strategy-backup) can also be used with Swarm.

When configuring multi-strategy snapshots, all volumes that will be restored should be included under the same strategy.

```yaml
...
backup:
  enabled: true
  strategies:
    - name: full
      swarm:
        volumes: [ "redis-backup-data" ]
...
```
