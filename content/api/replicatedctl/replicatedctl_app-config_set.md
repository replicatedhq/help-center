---
aliases:
- docs/reference/replicatedctl/replicatedctl_app-config_set
categories:
- replicatedctl
date: "2020-03-30T08:05:16-07:00"
description: Sets an individual app config value
gradient: purpleToPink
index: docs
title: replicatedctl app-config set
weight: "551"
---

{{<legacynotice>}}

## replicatedctl app-config set

Sets an individual app config value

### Synopsis

Sets an individual app config value

```
replicatedctl app-config set NAME [flags]
```

### Options

```
      --data stringArray    Sets the item data
  -h, --help                help for set
      --skip-validation     Save without validating
      --value stringArray   Sets the item value
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl app-config](/api/replicatedctl/replicatedctl_app-config/)	 - Manage app config

