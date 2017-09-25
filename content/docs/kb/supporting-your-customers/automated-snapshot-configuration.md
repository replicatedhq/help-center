---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Automated Snapshot Configuration"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Snapshots"]
---

In Replicated, snapshots can be run any time by clicking the “Run” button on the dashboard.
Sometimes, it may be preferable to configure this to run automatically, on a set schedule.
This can be accomplished by editing (or creating) a /etc/replicated.conf and manually restarting
the Replicated service.

## Sample conf file

```json
{
  "SnapshotsPath": "/var/lib/replicated/snapshots",
  "SnapshotsSchedule": "0 0 * * *",
  "SnapshotsMaxBackups": 4,
  "DisableScheduledSnapshots": false
}
```

| Setting | Acceptable Values | Description |
|---------|-------------------|-------------|
| `SnapshotsPath` | A path location as a `string` | The location where your snapshots are stored. <br />**Default Value:** `/var/lib/replicated/snapshots` |
| `SnapshotsSchedule` | CRON expression as a `string` | A time interval as represented by a [CRON Expression](https://en.wikipedia.org/wiki/Cron#CRON_expression). (This is parsed and interpreted in GMT/UTC time zone). <br />**Default Value**: `"0 0 * * *"` |
| `SnapshotsMaxBackups` | `int` | Number of snapshots that will be kept (FIFO). <br />**Default Value:** `3` |
| `DisableScheduledSnapshots` | `boolean` | A boolean that represents if automatic scheduled snapshots are running. <br />**Default Value**: `true` |

**NOTE: You have to restart the replicated service for these changes to take effect**

### Ubuntu/Debian
```shell
service replicated restart
```

### CentOS/RHEL/Fedora
```shell
systemctl restart replicated
```

Take a look at our [restoring from a snapshot](/docs/kb/supporting-your-customers/restoring-from-a-snapshot/) article 
for more on this subject.
