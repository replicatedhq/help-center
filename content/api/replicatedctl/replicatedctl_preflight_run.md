---
date: "2016-07-03T04:12:27Z"
title: "replicatedctl preflight run"
description: "Run the preflight checks"
weight: "551"
categories: [ "replicatedctl" ]
index: "docs"
aliases : [docs/reference/replicatedctl/replicatedctl_preflight_run]
---

## replicatedctl preflight run

Run the preflight checks

### Synopsis


Run the preflight checks

```
replicatedctl preflight run
```

### Options

```
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

