---
date: "2017-03-17T00:00:00Z"
lastmod: "2017-03-17T00:00:00Z"
title: "Replicated Snapshots and Redis"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
---

Many applications use Redis, and sometimes it's important to include the state from a Redis instance in a snapshot to be able to restore an installation at a later date.

Redis supports two different modes of backing up: AOF and RDB.

### RDB
Using an RDB dump is the recommended method to include Redis data in a Replicated snapshot. With the Replicated native scheduler, an example YAML to include Redis is:

```yaml


```

### AOF
The challenge with snapshotting an AOF file is that it could be written to in the middle of the snapshot process. Replicated doesn't create a lock or prevent modifications to the file while it's snapshotting it. If the file is modified while being snapshotted, it could likely end up corrupted and not usable.

An example of a safe way to use AOF mode to snapshot Redis in Replicated is to pause the container during the snapshot to prevent the archive from being corrupted:

```yaml

```