---
aliases:
- docs/reference/replicatedctl/replicatedctl_app-release_ls
categories:
- replicatedctl
date: 2018-02-20T00:45:55Z
description: List app releases
index: docs
title: replicatedctl app-release ls
weight: "551"
gradient: "purpleToPink"
---

## replicatedctl app-release ls

List app releases

### Synopsis


List app releases

```
replicatedctl app-release ls
```

### Options

```
      --all               Display all app releases
      --fetch             Fetch releases form Market API
  -o, --output string     Output format. One of: json|yaml
      --pending           Display only pending app releases
  -q, --quiet             Only display IDs
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO
* [replicatedctl app-release](/api/replicatedctl/replicatedctl_app-release/)	 - Manage app releases

