---
aliases:
- docs/reference/replicatedctl/replicatedctl_task_attach
categories:
- replicatedctl
date: "2020-03-30T08:05:16-07:00"
description: Stream task progress
gradient: purpleToPink
index: docs
title: replicatedctl task attach
weight: "551"
---

{{<legacynotice>}}

## replicatedctl task attach

Stream task progress

### Synopsis

Stream task progress

```
replicatedctl task attach ID [flags]
```

### Options

```
  -h, --help              help for attach
  -q, --quiet             Suppress stdout
      --raw               Raw JSON stream
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl task](/api/replicatedctl/replicatedctl_task/)	 - Manage tasks

