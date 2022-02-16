---
aliases:
- docs/reference/replicatedctl/replicatedctl_app_status
categories:
- replicatedctl
date: "2020-03-30T08:05:16-07:00"
description: Display detailed information on the app's status
gradient: purpleToPink
index: docs
title: replicatedctl app status
weight: "551"
---

{{<legacynotice>}}

## replicatedctl app status

Display detailed information on the app's status

### Synopsis

Display detailed information on the app's status

```
replicatedctl app status [flags]
```

### Options

```
  -h, --help              help for status
  -o, --output string     Output format. One of: json|yaml
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl app](/api/replicatedctl/replicatedctl_app/)	 - Manage apps

