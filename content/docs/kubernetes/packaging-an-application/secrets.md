---
date: "2016-07-03T04:02:20Z"
title: "Secrets"
description: "An overview of the various sections of the Replicated YAML."
weight: "2604"
categories: [ "Packaging a Kubernetes Application" ]
index: "docs/kubernetes"
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{< linked_headline "Secrets" >}}

Kubernetes secrets are a common resource and are often deployed using a different process from other resource types. Secrets should be deployed before the specs that reference them, and the contents of secrets is likely to be dynamic for each customer.

Using the [Replicated template functions](../template-functions), it's possible to dynamically write secrets based on config items (user supplied data), cmds (generated data) or other externally available, dynamically built input.

