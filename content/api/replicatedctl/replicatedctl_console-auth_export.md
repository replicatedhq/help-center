---
aliases:
- docs/reference/replicatedctl/replicatedctl_console-auth_export
categories:
- replicatedctl
date: "2019-07-31T18:16:51-07:00"
description: Export console auth config for current auth type
gradient: purpleToPink
index: docs
title: replicatedctl console-auth export
weight: "551"
---

## replicatedctl console-auth export

Export console auth config for current auth type

### Synopsis

Export console auth config for current auth type

```
replicatedctl console-auth export [flags]
```

### Options

```
  -h, --help              help for export
  -o, --output string     Output format. One of: json|yaml
      --template string   Format the output using the given Go template
      --type string       Get configuration for auth type (one of anonymous, password, ldap)
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl console-auth](/api/replicatedctl/replicatedctl_console-auth/)	 - Manage UI console authentication settings

