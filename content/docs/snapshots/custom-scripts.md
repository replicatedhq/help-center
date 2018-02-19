---
date: "2016-07-07T04:02:20Z"
title: "Custom Backup Commands"
description: "Configure custom commands to run during a snapshot"
weight: "2201"
categories: [ "Snapshots" ]
index: "docs/snapshots"
---

{{< linked_headline "Custom Backup Commands" >}}

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