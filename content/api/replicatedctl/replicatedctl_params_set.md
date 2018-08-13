---
aliases:
- docs/reference/replicatedctl/replicatedctl_params_set
categories:
- replicatedctl
date: 2018-08-13T13:37:11-07:00
description: Sets an individual Replicated daemon parameter value
gradient: purpleToPink
index: docs
title: replicatedctl params set
weight: "551"
---

## replicatedctl params set

Sets an individual Replicated daemon parameter value

### Synopsis

Sets an individual Replicated daemon parameter value

```
replicatedctl params set KEY [flags]
```

### Examples

```
replicatedctl params set AppUpdateCheckSchedule --value '@every 5h'
```

### Options

```
  -h, --help           help for set
      --value string   Sets the param value
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl params](/api/replicatedctl/replicatedctl_params/)	 - Manage Replicated daemon parameters. Provides the ability to import, export, set and unset parameters.

