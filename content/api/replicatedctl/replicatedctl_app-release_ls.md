---
aliases:
- docs/reference/replicatedctl/replicatedctl_app-release_ls
categories:
- replicatedctl
date: "2020-03-30T08:05:16-07:00"
description: List app releases
gradient: purpleToPink
index: docs
title: replicatedctl app-release ls
weight: "551"
---

## replicatedctl app-release ls

List app releases

### Synopsis

List app releases

```
replicatedctl app-release ls [flags]
```

### Options

```
      --all               Display all app releases
      --fetch             Fetch releases from the cloud
  -h, --help              help for ls
  -o, --output string     Output format. One of: json|yaml
      --pending           Display only pending app releases
  -q, --quiet             Only display IDs
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl app-release](/api/replicatedctl/replicatedctl_app-release/)	 - Manage app releases

