---
aliases:
- docs/reference/replicatedctl/replicatedctl_app-release_apply
categories:
- replicatedctl
date: "2019-03-11T17:10:05-07:00"
description: Applies pending app releases
gradient: purpleToPink
index: docs
title: replicatedctl app-release apply
weight: "551"
---

## replicatedctl app-release apply

Applies pending app releases

### Synopsis

Applies pending app releases

```
replicatedctl app-release apply [flags]
```

### Options

```
  -a, --attach               Attach to task
      --fetch-timeout uint   Fetch timeout in seconds (default 300)
  -h, --help                 help for apply
  -q, --quiet                Only display task ID
      --raw                  Raw JSON stream
      --sequence int         Apply releases up to and including specified sequence (0 for all)
      --template string      Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl app-release](/api/replicatedctl/replicatedctl_app-release/)	 - Manage app releases

