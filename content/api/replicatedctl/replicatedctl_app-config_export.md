---
aliases:
- docs/reference/replicatedctl/replicatedctl_app-config_export
categories:
- replicatedctl
date: "2019-07-31T18:16:51-07:00"
description: Export app config settings
gradient: purpleToPink
index: docs
title: replicatedctl app-config export
weight: "551"
---

## replicatedctl app-config export

Export app config settings

### Synopsis

Export app config settings

```
replicatedctl app-config export [flags]
```

### Options

```
  -h, --help              help for export
      --hidden            Include hidden values in output
  -o, --output string     Output format. One of: json|yaml
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl app-config](/api/replicatedctl/replicatedctl_app-config/)	 - Manage app config

