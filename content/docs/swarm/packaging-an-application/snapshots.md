---
date: "2017-02-19T00:00:00Z"
title: "Swarm Snapshots"
description: "Application Snapshots on Swarm"
categories: [ "Packaging a Swarm Application" ]
weight: "614"
index: "docs/swarm"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

Swarm snapshots can be used to backup installed apps along with their named volumes as of Replicated 2.17.0.

### Configuration

Any volumes holding your application data can be included in snapshots by listing them under the `backup` section in your config.
Replicated will check all nodes in your cluster for volumes with a matching name and include them in your snapshot.

You can optionally specify backup scripts to prepare your data for snapshotting with admin commands.

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
    volumes: [ "redis-backup data" ]

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

### Configuring Snapshot Storage

Snapshots will be stored at the host path `/var/lib/replicated/snapshots` by default.
Users can use the Replicated Admin Console to configure SFTP or Amazon S3 as alternative storage backends.
