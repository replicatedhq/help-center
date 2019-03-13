---
categories:
- ship-lifecycle
date: 2018-01-17T23:51:55Z
description: Kustomize adds an interactive step for last-mile customization of kubernetes YAML manifests. The user will be able to examine all output manifests, and store any desired changes/tweaks separate from the base yaml. For more info on Kustomize, see [kustomize.io](https://kustomize.io).
index: docs
title: kustomize
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/overview) | [Config](/api/ship-config/overview) | [Lifecycle](/api/ship-lifecycle/overview)

## kustomize

Kustomize adds an interactive step for last-mile customization of kubernetes YAML manifests. The user will be able to examine all output manifests, and store any desired changes/tweaks separate from the base yaml. For more info on Kustomize, see [kustomize.io](https://kustomize.io).




### Examples

```yaml
lifecycle:
  v1:
    - kustomize:
        base: ./k8s/base
        overlay: ./overlays/production
        dest: ./rendered.yaml
```
