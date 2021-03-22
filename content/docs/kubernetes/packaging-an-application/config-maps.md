---
date: "2016-07-03T04:02:20Z"
title: "Config Maps"
description: "An overview of the various sections of the Replicated YAML."
weight: "2605"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{<kotsdocs>}}
For KOTS documentation, check out [kots.io](https://kots.io/vendor).
{{</kotsdocs>}}

{{< linked_headline "Config Maps" >}}

Config maps are Kubernetes resources that create dynamic text files (often used for config files) mounted in a container. Using the [Replicated template functions](../template-functions), it's possible to generate a config map dynamically that includes information generated from config items (user supplied data) or cmds (automatically generated data).

