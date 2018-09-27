---
aliases:
- docs/reference/replicatedctl/replicatedctl_cluster_node-join-script
categories:
- replicatedctl
date: 2018-09-27T12:18:29-07:00
description: Outputs the script to run to join a node to the cluster
gradient: purpleToPink
index: docs
title: replicatedctl cluster node-join-script
weight: "551"
---

## replicatedctl cluster node-join-script

Outputs the script to run to join a node to the cluster

### Synopsis

Outputs the script to run to join a node to the cluster

```
replicatedctl cluster node-join-script [flags]
```

### Options

```
      --advanced                 Advanced install option
  -h, --help                     help for node-join-script
      --private-address string   The public address of the node
      --public-address string    The public address of the node
      --tags stringArray         Tags to apply to the node
```

### Options inherited from parent commands

```
      --host string   Replicated API host (default "unix:///var/run/replicated/replicated-cli.sock")
```

### SEE ALSO

* [replicatedctl cluster](/api/replicatedctl/replicatedctl_cluster/)	 - Manage the cluster

