---
aliases:
- docs/reference/replicatedctl/replicatedctl_params_export
categories:
- replicatedctl
date: 2018-08-14T17:46:29-07:00
description: Export Replicated daemon parameters to stdout
gradient: purpleToPink
index: docs
title: replicatedctl params export
weight: "551"
---

## replicatedctl params export

Export Replicated daemon parameters to stdout

### Synopsis

Export Replicated daemon parameters to stdout

```
replicatedctl params export [flags]
```

### Examples

```
replicatedctl params export --output yaml > params.yaml
replicatedctl params export --template '{{.AppUpdateCheckSchedule}}'
```

### Options

```
  -h, --help              help for export
  -o, --output string     Output format. One of: json|yaml
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl params](/api/replicatedctl/replicatedctl_params/)	 - Manage Replicated daemon parameters. Provides the ability to import, export, set and unset parameters.

