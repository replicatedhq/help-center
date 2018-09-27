---
aliases:
- docs/reference/replicatedctl/replicatedctl_preflight_run
categories:
- replicatedctl
date: 2018-09-27T12:18:29-07:00
description: Run the preflight checks
gradient: purpleToPink
index: docs
title: replicatedctl preflight run
weight: "551"
---

## replicatedctl preflight run

Run the preflight checks

### Synopsis

Run the preflight checks

```
replicatedctl preflight run [flags]
```

### Options

```
  -h, --help              help for run
  -o, --output string     Output format. One of: json|yaml
  -q, --quiet             Only display checksum
      --sequence string   App sequence (default "current")
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl preflight](/api/replicatedctl/replicatedctl_preflight/)	 - View or manage preflight checks

