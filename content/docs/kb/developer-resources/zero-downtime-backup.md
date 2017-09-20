---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Zero Downtime Backups with Replicated (Redis)"
weight: "999999"
categories: [ "Developer Resources" ]
tags: ["Application YAML"]
index: "docs"
---

Replicated provides a way to achieve zero downtime backups by combining two of our more powerful replicated features: [Admin Commands](/docs/packaging-an-application/admin-commands/) and [Snapshots](/docs/packaging-an-application/snapshots/).

In this example we will demonstrate how to backup redis without having to stop the redis process itself:

## Step 1: Create Redis Container with 2 volumes.

**Note: This YAML creates 2 Docker volumes: 1) A primary volume (“data”) 2) a secondary volume (“backup”) that will be used to store the redis dump. Make sure that your primary volume (ie “data”) has `is_excluded_from_backup: true` to ensure that it isn't paused during the backup process.**

```yaml
components:
- name: DB
  containers:
  - source: public
    image_name: redis
    version: latest
    cmd: "[\"redis-server\", \"--appendonly\", \"yes\"]"
    volumes:
    - host_path: /data
      container_path: /data:rw
      is_excluded_from_backup: true
    - host_path: /backup
      container_path: /backup
    support_files: []
```

## Step 2: Create your admin Commands to backup and move data

```yaml
admin_commands:
- alias: backup-redis-to-rdb
  command: [redis-cli, bgsave]
  run_type: exec
  component: DB
  container: redis
- alias: mv-backup-rdb-to-safe-place
  command: [mv, /data/dump.rdb, /backup/dump.rdb]
  run_type: exec
  component: DB
  container: redis
```

## Step 3: Enable backups

We enable backups and inline a script that calls our admin commands (notice that we use the `--no-tty` flag). Note: `pause_all` is set to false thus enabling 0 downtime backups!

```yaml
backup:
  enabled: true
  pause_all: false
  script: |
    #!/bin/sh
    replicated admin --no-tty backup-redis-to-rdb
    replicated admin --no-tty mv-backup-rdb-to-safe-place
```

And there you have it, zero downtime backup!

[Download Full Replicated YAML Example](https://github.com/replicatedhq/repl-yaml-samples/blob/master/apps/Zero_Redis_Counter_App.yml).
