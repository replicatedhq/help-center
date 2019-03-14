---
aliases:
- docs/reference/replicatedctl/replicatedctl_task_ls
categories:
- replicatedctl
date: "2019-03-12T12:19:48-07:00"
description: List tasks
gradient: purpleToPink
index: docs
title: replicatedctl task ls
weight: "551"
---

## replicatedctl task ls

List tasks

### Synopsis

List tasks

```
replicatedctl task ls [flags]
```

### Options

```
      --all               Display all tasks
  -h, --help              help for ls
  -o, --output string     Output format. One of: json|yaml
  -q, --quiet             Only display IDs
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl task](/api/replicatedctl/replicatedctl_task/)	 - Manage tasks

