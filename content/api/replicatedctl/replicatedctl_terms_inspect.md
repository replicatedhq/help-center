---
aliases:
- docs/reference/replicatedctl/replicatedctl_terms_inspect
categories:
- replicatedctl
date: "2020-03-30T08:05:16-07:00"
description: Gets the terms of service
gradient: purpleToPink
index: docs
title: replicatedctl terms inspect
weight: "551"
---

## replicatedctl terms inspect

Gets the terms of service

### Synopsis

Gets the terms of service

```
replicatedctl terms inspect [flags]
```

### Examples

```

  # Output the terms markdown
  replicatedctl terms inspect --template '{{.Markdown}}'

  # Output true or false if the terms have been accepted
  replicatedctl terms inspect -q
```

### Options

```
  -h, --help              help for inspect
  -o, --output string     Output format. One of: json|yaml
  -q, --quiet             Will output "true" if the terms have been accepted, otherwise "false".
      --template string   Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl terms](/api/replicatedctl/replicatedctl_terms/)	 - Read and accept the terms of service

