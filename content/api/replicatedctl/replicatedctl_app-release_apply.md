---
aliases:
- docs/reference/replicatedctl/replicatedctl_app-release_apply
categories:
- replicatedctl
date: 2018-02-20T00:45:55Z
description: Applies pending app releases
index: docs
title: replicatedctl app-release apply
weight: "551"
gradient: "purpleToPink"
---

## replicatedctl app-release apply

Applies pending app releases

### Synopsis


Applies pending app releases

```
replicatedctl app-release apply
```

### Options

```
  -a, --attach            Attach to task
  -q, --quiet             Only display task ID
      --raw               Raw JSON stream
      --sequence int      Apply releases up to and including specified sequence (0 for all)
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO
* [replicatedctl app-release](/api/replicatedctl/replicatedctl_app-release/)	 - Manage app releases

