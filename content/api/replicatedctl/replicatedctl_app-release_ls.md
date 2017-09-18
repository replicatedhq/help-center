---
date: "2016-07-03T04:12:27Z"
title: "replicatedctl app-release ls"
description: "List app releases"
weight: "551"
categories: [ "replicatedctl" ]
index: "docs"
aliases : [docs/reference/replicatedctl/replicatedctl_app-release_ls]
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

