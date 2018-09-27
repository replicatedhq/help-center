---
aliases:
- docs/reference/replicatedctl/replicatedctl_system_status
categories:
- replicatedctl
date: 2018-09-27T12:18:29-07:00
description: Gets the Replicated system status
gradient: purpleToPink
index: docs
title: replicatedctl system status
weight: "551"
---

## replicatedctl system status

Gets the Replicated system status

### Synopsis

Gets the Replicated system status

```
replicatedctl system status [flags]
```

### Examples

```
replicatedctl system status --template '{{.SystemStatus}}'
replicatedctl system status -q
```

### Options

```
  -h, --help              help for status
  -o, --output string     Output format. One of: json|yaml
  -q, --quiet             Displays the max status of all systems
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl system](/api/replicatedctl/replicatedctl_system/)	 - Get Replicated system information

