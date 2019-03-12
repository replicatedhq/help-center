---
aliases:
- docs/reference/replicatedctl/replicatedctl_app-config_import
categories:
- replicatedctl
date: "2019-03-12T12:19:48-07:00"
description: Import app config settings from stdin
gradient: purpleToPink
index: docs
title: replicatedctl app-config import
weight: "551"
---

## replicatedctl app-config import

Import app config settings from stdin

### Synopsis

Import app config settings from stdin

```
replicatedctl app-config import [flags]
```

### Options

```
      --format string     Input format. One of: json|yaml (default "json")
  -h, --help              help for import
      --skip-validation   Save without validating
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl app-config](/api/replicatedctl/replicatedctl_app-config/)	 - Manage app config

