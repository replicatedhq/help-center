---
aliases:
- docs/reference/replicatedctl/replicatedctl_license_inspect
categories:
- replicatedctl
date: 2018-09-27T12:18:29-07:00
description: Display detailed information on the license
gradient: purpleToPink
index: docs
title: replicatedctl license inspect
weight: "551"
---

## replicatedctl license inspect

Display detailed information on the license

### Synopsis

Display detailed information on the license

```
replicatedctl license inspect [flags]
```

### Options

```
  -h, --help              help for inspect
  -o, --output string     Output format. One of: json|yaml
      --sync              Sync license
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl license](/api/replicatedctl/replicatedctl_license/)	 - Manage the license

