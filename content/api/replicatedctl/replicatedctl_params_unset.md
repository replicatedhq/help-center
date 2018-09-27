---
aliases:
- docs/reference/replicatedctl/replicatedctl_params_unset
categories:
- replicatedctl
date: 2018-09-27T12:18:29-07:00
description: Unsets a runtime overridden Replicated daemon parameter value
gradient: purpleToPink
index: docs
title: replicatedctl params unset
weight: "551"
---

## replicatedctl params unset

Unsets a runtime overridden Replicated daemon parameter value

### Synopsis

Unsets a runtime overridden Replicated daemon parameter value

```
replicatedctl params unset KEY [flags]
```

### Examples

```
replicatedctl params unset AppUpdateCheckSchedule
```

### Options

```
  -h, --help   help for unset
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl params](/api/replicatedctl/replicatedctl_params/)	 - Manage Replicated daemon parameters. Provides the ability to import, export, set and unset parameters.

