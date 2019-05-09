---
date: "2016-07-07T04:02:20Z"
title: "Custom Backup Commands"
description: "Configure custom commands to run during a snapshot"
weight: "2202"
categories: [ "Snapshots" ]
index: "other"
---

{{< linked_headline "Custom Backup Commands" >}}

Snapshots will always include customer console configuration and replicated settings.
When not excluded with `exclude_registry_data: true`, docker registry data will be backed up as well.
On the Native scheduler, all bind mounts will be backed up.
For the [Swarm](/docs/snapshots/swarm) and [Kubernetes](/docs/snapshots/kubernetes/) schedulers, any desired volumes must be specified in your application yaml.
You also have the ability to specify a custom script that will be run at the time of a backup.
This script will run on the host that is running the primary Replicated container, not inside any of your containers.
If you need this script to execute something within a container, you can call [Admin Commands](/docs/packaging-an-application/admin-commands/).

{{< linked_headline "YAML Properties" >}}

`enabled`: A boolean or template function that evaluates to a boolean and then determines if backups are enabled.

`pause_containers`: A string that can equal "true" or "false". If true, Replicated will pause all containers and then resume them upon completion (note your app will potentially have downtime). Take a look at [this article](/docs/kb/developer-resources/zero-downtime-backup/) for tips on zero downtime backups.

`exclude_registry_data`: A boolean or template function that evaluates to a boolean. If value is true, on-prem Docker registry will not be included in backups.

`disable_deduplication`: A boolean or template function that evaluates to a boolean. If value is true, backed up files will not be deduplicated.  Every identical file will be uploaded to the specified backend every time and will be saved in its own storage space.

`script`: A shell script that will run on the server at the time of backup. _Note: The designated executable must be `/bin/sh`. `/bin/bash` is not available in the container that executes the script._

`restore_script`: A shell script that will run on the server at the time of restore.  This script will be executed after all other data has been restored and the application has entered the Started state. *NOTE: this feature is not yet supported when running with the Kubernetes scheduler.*

```yaml
backup:
  enabled: '{{repl ConfigOptionEquals "backup_enabled" "1" }}'
  pause_containers: '{{repl LicenseFieldValue "zero_downtime_backups_enabled" }}'
  exclude_registry_data: '{{repl ConfigOptionEquals "exclude_registry_data" "1" }}'
  script: |
    #!/bin/sh
    replicated admin --no-tty backup
```

{{< linked_headline "Multi-strategy Backup" >}}

The multi-strategy snapshot functionality in Replicated Platform supports different snapshot strategies that can include individualized custom commands, backup schedules and remote backup destinations. Customers running the Admin Console will see these different strategies; each strategy contains it's own schedule and destination. When the `strategies` array is defined, it will override the `pause_containers` and the `script` values in the single backup definition.

`name`: A name to uniquely identify the strategy.

`description`: A description of the snapshot strategy to be included in the settings UI.

`manual`: A templatable flag, if evaluates to true this strategy will be triggered by clicking the Start Snapshot button.  Multiple strategies can have this flag set.

`exclude_replicated_data`: A templatable flag, if evaluates to true, Replicated data will be excluded from the backup. This data includes Replicated and application settings, registry data, encryption keys, certificates, and audit log data.  Snapshots with this flag set to true cannot be restored via the Replicated restore process.  Multiple strategies can have this flag set to false, but only one of them can be used during the restore process.

`exclude_app_data`: A templatable flag, if evaluates to true, application data will be excluded from the backup. This data includes application container volumes.

`pause_containers`: A string that can equal "true" or "false". If true, Replicated will pause all containers and then resume them upon completion (note your app will potentially have downtime). It's possible to snapshot most data without pausing the containers, we've [published an article](/docs/kb/developer-resources/zero-downtime-backup/) for tips on zero downtime backups.

`script`: A shell script that will run on the server at the time of backup. _Note: The designated executable must be `/bin/sh`. `/bin/bash` is not available in the container that executes the script._

`restore_script`: A shell script that will run on the server at the time of restore.  This script will be executed after all other data has been restored and the application has entered the Started state.  Only the script defined for the strategy whose snapshot is being restored will be executed. *NOTE: this feature is not yet supported when running with the Kubernetes scheduler.*

```yaml
backup:
  enabled: '{{repl ConfigOptionEquals "backup_enabled" "1" }}'
  strategies:

    - name: full
      description: "This is a full backup of the application database. Your application will experience downtime when a backup is in progress."
      manual: true
      exclude_replicated_data: false
      enabled: '{{repl ConfigOptionEquals "backup_full_enabled" "1" }}'

    - name: nightly
      description: "This is a point in time backup of the database write ahead logs. Your application will not experience downtime when a backup is in progress."
      enabled: '{{repl ConfigOptionEquals "backup_nightly_enabled" "1" }}'
      exclude_replicated_data: true
      script: |
        #!/bin/sh
        replicated admin --no-tty backup-nightly
```
