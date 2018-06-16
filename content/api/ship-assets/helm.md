---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: A `helm` asset will template and render an existing helm chart. Your installer runbook should included assets to drop an existing helm chart at `local.chart_root`. Future releases will include support for charts stored in private github repos or in chart repositories like ChartMuseum.
index: docs
title: helm
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## helm

A `helm` asset will template and render an existing helm chart. Your installer runbook should included assets to drop an existing helm chart at `local.chart_root`. Future releases will include support for charts stored in private github repos or in chart repositories like ChartMuseum.


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


- `dest` - The directory in which to render the. If the source chart is at `charts/src/nginx`, and `dest` is set to `charts/rendered/`, then the chart will be templated at `charts/rendered/nginx`


- `local` - Configuration for indicating an already existing source chart to render from.


    
### Optional Parameters


- `helm_opts` - Additional options as would be passed to `helm template`


- `mode` - The unix permisions to set on the chart's parent directory


- `values` - Values to set during rendering, overrides defaults in `values.yaml` if present in the chart root.


    
    