---
date: "2016-07-03T04:12:27Z"
title: "Replicated CLI Reference"
description: "Generated documentation on the default Replicated CLI commands available for all Replicated installed instances."
weight: "504"
categories: [ "Reference" ]
index: "docs"
aliases : [docs/reference/replicated-cli]
tags: ["CLI Commands"]
---

After [installing replicated](/docs/distributing-an-application/installing/#section-easy-installation) onto a remote host a CLI is enabled
that can be utilized for both management and maintenance. This tool can be especially helpful when debugging issues that can arise if the
replicated-ui is not fully installed or working properly.

## Source replicated.alias
If command not found is displayed when attempting to execute the replicated CLI we will need to source the replicated.alias file.

```shell
source /etc/replicated.alias
```

## Version
List version of currently running replicated components.

```shell
replicated -version
```

## Status
This provides the current status of replicated.

```shell
replicated status
```

## Apps
List ID, Sequence, and Status of running app and prior versions installed on this host.

```shell
replicated apps
```

## App
App sub-commands allow manipulating app state and version.

Show app info in JSON format
```shell
replicated app <appid>
```

### App state

Show and modify app state
```shell
replicated app <appid> status|components|rm|start|stop|pause|unpause|settings
```

| Command | Description |
|---------|-------------------|
| {{< version version="2.0" >}} status | Show app status (`Started`, `Paused`, etc) |
| components | List app components |
| rm | Delete app |
| start &#124; stop &#124; pause &#124; unpause | Transition app into the specified state |
| {{< version version="2.1" >}} settings | Export app settings in JSON format |

The settings command is useful for [automating an installation](/docs/kb/developer-resources/automate-install/).

Sometimes app state might be locked for extended periods of time depending on the app
launch procedure and various timeout settings.  In cases like this, app can be forced
to transition into the Stopped state by using the `-f` switch.
```shell
replicated app <app_id> stop -f
```

### App updates

Trigger a check for updates.  The `-f` switch can be used to ignore local cache and perform full YAML sync for pending updates.
```shell
replicated app <app_id> update-check -f
```

{{< version version="2.2" >}} List pending updates.  Note that this will not trigger an update check.
```shell
replicated app <app_id> updates list
```

{{< version version="2.0" >}} Install the specified app version.  Note that all
preceding required versions will be installed as well.

{{< warning title="Obsolete" >}}
This command has been superseded by the next command.
{{< /warning >}}
```shell
replicated app <appid> update install <sequence number>
```

{{< version version="2.2" >}} Install the specified app version.  Note that all
preceding required versions will be installed as well.
```shell
replicated app <appid> updates install <sequence number>
```

### App preflight checks

{{< version version="2.2" >}} Run preflight checks
```shell
replicated app <appid> run-checks
```

{{< version version="2.2" >}} Show preflight checks status
```shell
replicated app <appid> run-checks status
```

{{< version version="2.2" >}} Dismiss preflight checks errors and warnings
```shell
replicated app <appid> run-checks dismiss
```

## Generate Support Bundle
{{< version version="1.2.63" >}} Generate support bundle.

```shell
replicated support-bundle <app-id>
```

## Reset your On-Prem UI password
Your console password can be reset by issuing the following command from the host machine where Replicated
has been installed. (then visit https://`<server>`:8800/create-password and set a new password)

```shell
replicated auth reset
```

## Hosts

{{< version version="1.2" >}} This lists all known hosts that are currently in use
by Replicated. It includes the following information for each host : `ID`, `NAME`, `PRIVATE ADDRESS`, `PUBLIC ADDRESS`, `CONNECTED`, `PROVISIONED`, `AGENT VERSION`, `API VERSION`, `TAGS`

```shell
replicated hosts
```

{{< version version="2.0" >}} This lists all known nodes that are currently in use
by Replicated. It includes the following information for each host: `ID`, `PRIVATE ADDRESS`, `PUBLIC ADDRESS`, `CONNECTED`, `INITIALIZED`, `VERSION`, `TAGS`

```shell
replicated nodes
```

## Certificate Configuration via CLI
You can set the hostname, key, and cert using the following command.

```shell
replicated console cert set <hostname> /path/to/key /path/to/cert
```

## Tasks
Show the running processes inside replicated.

```shell
replicated tasks
```

## Show Logs of a Task
Using this command you can see the logs associated with a given task.
Note: task-id is retrieved utilizing the apps command.

```shell
replicated task <task-id> logs
```

## Snapshots
{{< version version="2.5.0" >}} Show available snapshots for an installed app.  This command will use settings for installed app to discover information about snapshots.

```shell
replicated snapshot list app <app id>
```

{{< version version="2.5.0" >}} Show available snapshots from a location on the local file system.  This command can be used when application has not been installed yet in cases when recovery from a snapshot is needed.

```shell
replicated snapshot list location <location>
```

{{< version version="2.8.0" >}} Start a snapshot. When the optional `--wait` flag is specified, the command will block until the current snapshot is complete. The optional `--exclude-app-data` flag indicates to back up only Replicated data, excluding all vendor application data from the snapshot.

```shell
replicated snapshot start <app id>:<version> --wait --exclude-app-data
```

{{< version version="2.5.0" >}} Restore an application from the specified snapshot.  When optional `--dismiss-prechecks` flag is specified, failed preflight checks will be ignored.  The optional `--node-timeout` flag indicates how long to wait for the initial node to connect.  The default is 60 seconds.

{{< warning title="Warning" >}}
This command cannot be used on a system with an already installed license.
{{< /warning >}}

```shell
replicated snapshot restore <location> <snapshot id> --dismiss-prechecks --node-timeout <seconds>
```

## Admin
Additionally you can define ad-hoc commands that can be executed inside a running container,
see the dedicated [Admin Commands](/docs/packaging-an-application/admin-commands) section
for more details.
