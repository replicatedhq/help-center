---
aliases:
- docs/reference/replicatedctl/replicatedctl_app_apply-config
categories:
- replicatedctl
date: "2019-03-12T12:19:48-07:00"
description: Apply the changed configuration to the app
gradient: purpleToPink
index: docs
title: replicatedctl app apply-config
weight: "551"
---

## replicatedctl app apply-config

Apply the changed configuration to the app

### Synopsis

Apply the changed configuration to the app

```
replicatedctl app apply-config [flags]
```

### Options

```
  -a, --attach            Attach to task
  -f, --force             Force stop
  -h, --help              help for apply-config
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

