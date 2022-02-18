---
aliases:
- docs/reference/replicatedctl/replicatedctl_app-release_render-scheduler-spec
categories:
- replicatedctl
date: "2020-03-30T08:05:16-07:00"
description: Render application scheduler spec
gradient: purpleToPink
index: docs
title: replicatedctl app-release render-scheduler-spec
weight: "551"
---

{{<legacynotice>}}

## replicatedctl app-release render-scheduler-spec

Render application scheduler spec

### Synopsis

Render application scheduler spec

```
replicatedctl app-release render-scheduler-spec [flags]
```

### Options

```
  -h, --help              help for render-scheduler-spec
      --raw               The spec will not be unmarshalled and post processed. It is possible the spec is invalid.
      --sequence string   Render spec for the given sequence (int) (default "current")
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl app-release](/api/replicatedctl/replicatedctl_app-release/)	 - Manage app releases

