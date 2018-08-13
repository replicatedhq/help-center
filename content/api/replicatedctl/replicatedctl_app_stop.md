---
aliases:
- docs/reference/replicatedctl/replicatedctl_app_stop
categories:
- replicatedctl
date: 2018-08-13T13:37:11-07:00
description: Stop the app
gradient: purpleToPink
index: docs
title: replicatedctl app stop
weight: "551"
---

## replicatedctl app stop

Stop the app

### Synopsis

Stop the app

```
replicatedctl app stop [flags]
```

### Options

```
  -a, --attach            Attach to task
  -f, --force             Force stop
  -h, --help              help for stop
  -q, --quiet             Only display task ID
      --raw               Raw JSON stream
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl app](/api/replicatedctl/replicatedctl_app/)	 - Manage apps

