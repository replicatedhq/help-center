---
categories:
- ship-lifecycle
date: 2018-01-17T23:51:55Z
description: This step presents an introduction page about kustomize, usually used before a `kustomize` step. Kustomize adds an interactive step for last-mile customization of kubernetes YAML manifests. The user will be able to examine all output manifests, and store any desired changes/tweaks separate from the base yaml. For more info on Kustomize, see [kustomize.io](https://kustomize.io).
index: docs
title: kustomizeIntro
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/overview) | [Config](/api/ship-config/overview) | [Lifecycle](/api/ship-lifecycle/overview)

## kustomizeIntro

This step presents an introduction page about kustomize, usually used before a `kustomize` step. Kustomize adds an interactive step for last-mile customization of kubernetes YAML manifests. The user will be able to examine all output manifests, and store any desired changes/tweaks separate from the base yaml. For more info on Kustomize, see [kustomize.io](https://kustomize.io).




### Examples

```yaml
lifecycle:
  v1:
    - kustomizeIntro: {}
```
