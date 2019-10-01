---
aliases:
- docs/reference/replicatedctl/replicatedctl_license-load
categories:
- replicatedctl
date: "2019-07-31T18:16:51-07:00"
description: Load the license from stdin
gradient: purpleToPink
index: docs
title: replicatedctl license-load
weight: "551"
---

## replicatedctl license-load

Load the license from stdin

### Synopsis

Load the license from stdin

```
replicatedctl license-load [flags]
```

### Options

```
      --airgap-package string   Path to the application airgap package
  -a, --attach                  Attach to task
      --force-online            Force an online installation even when running in airgapped mode
  -h, --help                    help for license-load
  -q, --quiet                   Only display task ID
      --raw                     Raw JSON stream
      --template string         Format the output using the given Go template
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl](/api/replicatedctl/)	 - Replicated CLI

