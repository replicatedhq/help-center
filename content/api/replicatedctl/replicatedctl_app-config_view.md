---
aliases:
- docs/reference/replicatedctl/replicatedctl_app-config_view
categories:
- replicatedctl
date: "2020-03-30T08:05:16-07:00"
description: View app config form
gradient: purpleToPink
index: docs
title: replicatedctl app-config view
weight: "551"
---

{{<legacynotice>}}

## replicatedctl app-config view

View app config form

### Synopsis

View app config form

```
replicatedctl app-config view [flags]
```

### Options

```
      --group string      Config group to filter by
  -h, --help              help for view
  -o, --output string     Output format. One of: json|yaml
  -q, --quiet             Only display IDs
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl app-config](/api/replicatedctl/replicatedctl_app-config/)	 - Manage app config

