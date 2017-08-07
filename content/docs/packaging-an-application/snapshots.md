---
date: "2016-07-07T04:02:20Z"
title: "Snapshots"
description: "Guide to enabling application snapshots for backup and restore functionality."
weight: "215"
categories: [ "Packaging" ]
index: "docs"
---

For detailed information on restoring a snapshot take a look at this [restore guide](/kb/supporting-your-customers/restoring-from-a-snapshot/).

Replicated gives customers the ability to take a snapshot of a running app. The customer will have the option to restore this snapshot as an option on the "Upload license" screen when starting the Replicated management container. Snapshots can be taken at an automatic interval and can also be manually triggered via the dashboard of the console.

Snapshots include customer console configuration, data from bind mounted volumes of all containers and if the customer instance is a multi-host instance, docker registry data will be backed up as well. You also have the ability to specify a custom script that will be run at the time of a backup. This script will run on the host that is running the primary Replicated container, not inside any of your containers. If you need this script to execute something within a container, you can call [Admin Commands](/packaging-an-application/admin-commands/).

## YAML Properties
`enabled`: A boolean or template function that evaluates to a boolean and then determines if backups are enabled.

`pause_containers`: A string that can equal "true" or "false". If true, Replicated will pause all containers and then resume them upon completion (note your app will potentially have downtime). Take a look at this article for tips on zero downtime backups.

`script`: A bash script that will run on the server at the time of backup.

`hidden`: Defaults to false (the snapshot tile is visible by default).

```yaml
backup:
  enabled: '{{repl ConfigOptionEquals "backup_enabled" "1" }}'
  hidden: '{{repl ConfigOptionEquals "backup_enabled" "0" }}'
  pause_containers: '{{repl LicenseFieldValue "zero_downtime_backups_enabled" }}'
  script: |
    #!/bin/sh
    replicated admin --no-tty backup
```

## Turn off Snapshotting by Volume
You can exclude a volume from being snapshotted by using the `is_excluded_from_backup` variable inside your container YAML.

We recommend that you exclude anything that's not necessary to restore the running system.

```yaml
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
```

## Customer Snapshot Configuration Options  
If snapshots are enabled for an application, end customers can configure the destination, retention, timeout and schedule automated snapshots on the Console Settings screen.
![snapshots](/static/snapshot-config.png)

{{< note title="Snapshot Redundancy" >}}
The default location for saving a snapshot on a Replicated enabled host is
`/var/lib/replicated/snapshots`.   This location may not be suitable for keeping
large amounts of data.  Additionally, by default, it is likely to be on the same physical volume as all other critical data.  We highly recommend this location is configured to be
on a separate volume (possibly a SAN) with large capacity to ensure data can be
recovered in case of a disaster.
{{< /note >}}
