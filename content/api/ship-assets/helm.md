---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: A `helm` asset will template and render an existing helm chart. You can either reference an existing chart in a private or public github repo, or your installer runbook can include assets to drop an existing helm chart at `local.chart_root`.
index: docs
title: helm
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## helm

A `helm` asset will template and render an existing helm chart. You can either reference an existing chart in a private or public github repo, or your installer runbook can include assets to drop an existing helm chart at `local.chart_root`.


```yaml
assets:
  v1:
    - helm:
        github:
          repo: github.com/replicatedhq/superbigtool-k8s
          ref: 8fcaebe55af67fe6789fa678faaa76fa867fbc
          path: k8s-yamls/
          dest: ./k8s/
          private: true
        dest: charts/rendered/
```

```yaml
assets:
  v1:
    - helm:
        values:
          AppFlavor: ship
          NginxReplicas: '{{repl ConfigOption \"nginx_replicas\"}}'
        helm_opts:
          - '--name'
          - >-
            {{repl Installation \"channel_name\"}}-{{repl Installation
            \"semver\"}}
        local:
          chart_root: charts/src/nginx/
        dest: charts/rendered/
```

    
### Required Parameters


- `dest` - The directory in which to render the chart. If the source chart is at `charts/src/nginx`, and `dest` is set to `charts/rendered/`, then the chart will be templated at `charts/rendered/nginx`


    
### Optional Parameters


- `github` - Configuration for indicating a chart hosted in a private or public github repo. Fields are same as `assets.v1.github`


- `helm_opts` - Additional options as would be passed to `helm template`


- `local` - Configuration for indicating an already existing source chart to render from.


- `values` - Values to set during rendering, overrides defaults in `values.yaml` if present in the chart root.


    
    