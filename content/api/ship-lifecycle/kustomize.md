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

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## kustomize

Kustomize adds an interactive step for last-mile customization of kubernetes YAML manifests. The user will be able to examine all output manifests, and store any desired changes/tweaks separate from the base yaml. For more info on Kustomize, see [kustomize.io](https://kustomize.io).




### Examples

```yaml
lifecycle:
  v1:
    - kustomize:
        base_path: ./k8s/base
        dest: ./k8s/overlays/production
```
