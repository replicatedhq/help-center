---
date: "2016-07-03T04:12:27Z"
title: "replicatedctl console-auth export"
description: "Export console auth config for current auth type"
weight: "551"
categories: [ "replicatedctl" ]
index: "docs"
aliases : [docs/reference/replicatedctl/replicatedctl_console-auth_export]
---

## replicatedctl console-auth export

Export console auth config for current auth type

### Synopsis


Export console auth config for current auth type

```
replicatedctl console-auth export
```

### Options

```
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

