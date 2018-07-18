---
aliases:
- docs/reference/replicatedctl/replicatedctl_task_inspect
categories:
- replicatedctl
date: 2018-06-22T16:37:46-07:00
description: Display detailed information on one or more tasks
gradient: purpleToPink
index: docs
title: replicatedctl task inspect
weight: "551"
---

## replicatedctl task inspect

Display detailed information on one or more tasks

### Synopsis

Display detailed information on one or more tasks

```
replicatedctl task inspect ID [ID...] [flags]
```

### Options

```
  -h, --help              help for inspect
  -o, --output string     Output format. One of: json|yaml
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl task](/api/replicatedctl/replicatedctl_task/)	 - Manage tasks

