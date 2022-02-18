---
date: "2018-03-03T04:02:20Z"
title: "Collectors"
description: "An explanation of Troubleshoot Collectors"
weight: "1702"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
aliases: [ /docs/troubleshoot/collectors, /docs/troubleshoot/server/collectors ]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
hideFromList: true
---

{{<legacynotice>}}

# Collectors

A Troubleshoot spec defines one or more (often many) collectors that to run when a support bundle is being generated. A collector target can be a single file, a directory of files, or a command to run and capture the output of.

When a support bundle is generated, the collectors are executed concurrently, and the results are all gathered into a single tar.gz bundle.

Collectors can come from various sources at generation time. If multiple inputs are provided, they are combined into a single set of collectors to run.

Replicated provides various collectors, all of them are [documented in reference section](/api/support-bundle-yaml-specs/shared/).

In a spec, collectors are listed under a `collect.v1` YAML field, as an array. The only required attribute on collectors is `output_dir` which specifies the location in the `supportbundle.tar.gz` archive where the output of the collector will be stored.

A simple, basic collector that identifies the server name (hostname) of a system and stores the output in a file named `/system/hostname.txt` would be:

```yaml
collect:
  v1:
    - os.hostname:
        output_dir: /system/hostname.txt
```

There are many additional, optional fields that collectors can use. And collectors can identify additional parameters also. For example, to collect information about all containers (including stopped, starting and other states), you can use the [docker.ps](/api/support-bundle-yaml-specs/docker-ps/) collector with a filter:

```yaml
collect:
  v1:
    - docker.ps
        output_dir: /docker/ps
        All: true
```

