---
date: "2016-07-03T04:02:20Z"
title: "Secrets"
description: "An overview of the various sections of the Replicated YAML."
weight: "2604"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{<kotsdocs>}}
For KOTS documentation, check out [kots.io](https://kots.io/vendor).
{{</kotsdocs>}}

{{< linked_headline "Secrets" >}}

Replicated does not externally manage secrets in Kubernetes clusters, instead being specified and used as part of the application specification. [Template functions](../template-functions) can be used to dynamically write secrets into a configuration item from [config items](/docs/config-screen/config-yaml) or [commands](/docs/config-screen/commands).

Kubernetes resources are created in the order they appear in the release YAML. Pods that reference secrets will not start until the secret is available. Until the secret is successfully mounted, the pod will stay in the `Pending` state. To reduce the amount of time the Kubernetes scheduler stays in this state, create secrets before creating pods.

Replicated does not recommend managing secrets separately from the release YAML. Secrets are provisioned in the namespace of the application release, which is subject to change between updates.
