---
aliases:
- docs/reference/replicatedctl/replicatedctl_app-release_inspect
categories:
- replicatedctl
date: 2017-11-20T23:45:42Z
description: Display detailed information on one or more app releases
index: docs
title: replicatedctl app-release inspect
weight: "551"
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

