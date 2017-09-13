---
date: "2016-07-03T04:12:27Z"
title: "replicatedctl app-release inspect"
description: "Display detailed information on one or more app releases"
weight: "551"
categories: [ "replicatedctl" ]
index: "docs"
aliases : [docs/reference/replicatedctl/replicatedctl_app-release_inspect]
---

## replicatedctl app-release inspect

Display detailed information on one or more app releases

### Synopsis


Display detailed information on one or more app releases

```
replicatedctl app-release inspect SEQUENCE [SEQUENCE...]
```

### Options

```
  -o, --output string     Output format. One of: json|yaml
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO
* [replicatedctl app-release](/api/replicatedctl/replicatedctl_app-release/)	 - Manage app releases

