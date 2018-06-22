---
aliases:
- docs/reference/replicatedctl/replicatedctl_params_import
categories:
- replicatedctl
date: 2018-06-22T16:37:46-07:00
description: Import Replicated parameters from stdin
gradient: purpleToPink
index: docs
title: replicatedctl params import
weight: "551"
---

## replicatedctl params import

Import Replicated parameters from stdin

### Synopsis

Import Replicated parameters from stdin

```
replicatedctl params import [flags]
```

### Examples

```
replicatedctl params import --format yaml < params.yaml
```

### Options

```
      --format string   Input format. One of: json|yaml (default "json")
  -h, --help            help for import
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl params](/api/replicatedctl/replicatedctl_params/)	 - Manage Replicated daemon parameters. Provides the ability to import, export, set and unset parameters.

