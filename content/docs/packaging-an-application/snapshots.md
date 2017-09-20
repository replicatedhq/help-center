---
date: "2016-07-07T04:02:20Z"
title: "Snapshots"
description: "Guide to enabling application snapshots for backup and restore functionality."
weight: "215"
categories: [ "Packaging an Application" ]
tags: [ "Snapshots", "Application YAML" ]
index: "docs"
---

{{< note title="Kubernetes" >}}
For the Kubernetes imeplementation of snapshots, please see the [Kubernetes snapshot documentation](/docs/packaging-an-application/kubernetes-snapshots/).
{{< /note >}}

Replicated gives customers the ability to take a snapshot of a running app. The customer will have the option to restore this snapshot as an option on the "Upload license" screen when starting the Replicated management container. Snapshots can be taken at an automatic interval and can also be manually triggered via the dashboard of the console.

Snapshots include customer console configuration, data from bind mounted volumes of all containers and if the customer instance is a multi-host instance, docker registry data will be backed up as well. You also have the ability to specify a custom script that will be run at the time of a backup. This script will run on the host that is running the primary Replicated container, not inside any of your containers. If you need this script to execute something within a container, you can call [Admin Commands](/docs/packaging-an-application/admin-commands/).

{{< linked_headline "YAML Properties" >}}

`enabled`: A boolean or template function that evaluates to a boolean and then determines if backups are enabled.

`pause_containers`: A string that can equal "true" or "false". If true, Replicated will pause all containers and then resume them upon completion (note your app will potentially have downtime). Take a look at this article for tips on zero downtime backups.

`script`: A bash script that will run on the server at the time of backup.

```yaml
backup:
  enabled: '{{repl ConfigOptionEquals "backup_enabled" "1" }}'
  pause_containers: '{{repl LicenseFieldValue "zero_downtime_backups_enabled" }}'
  script: |
    #!/bin/sh
    replicated admin --no-tty backup
```

{{< linked_headline "turn off Snapshotting by Volume" >}}

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

{{< linked_headline "Customer Snapshot Configuration Options" >}}

If snapshots are enabled for an application, end customers can configure the destination, retention, timeout and schedule automated snapshots on the Console Settings screen.

![snapshots](/images/post-screens/snapshot-config.png)

{{< note title="Remote Backends" >}}
Replicated supports S3, SFTP, and local backends for snapshots.  The use of local storage is highly discouraged in production instances for the following reasons:

  * Moving large number of files to local host can become a resource consuming operation, which will slow down other containers running on the host.

  * By default, local storage is likely to be on the same physical volume as all other critical data.  If this option is used, the path should be located on a network attached volume with large capacity.
{{< /note >}}

### Local

Local configuration only requires the name of the directory where snapshots will be stored.  No additional steps are needed.

### S3

S3 configuration requires that the bucket exists and the supplied key has write permissions to the bucket.  When configuring a new server, the bucket should be empty.

### SFTP

SFTP configuration requires that the path on the remote server exists and the user specified in the configuration has read/write permissions on the folder.  When configuring a new server, the destination folder on the remote server should be empty.

{{< note title="Multiple Instances" >}}
Multiple instances cannot share the same destination for snapshots when configured to use SFTP or S3.  Multiple instances will override each other's snapshot metadata when using identical configuration.
{{< /note >}}
