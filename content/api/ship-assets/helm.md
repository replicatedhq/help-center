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

{{<legacynotice>}}

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle)

## helm

A `helm` asset will template and render an existing helm chart. You can either reference an existing chart in a private or public github repo, or your installer runbook can include assets to drop an existing helm chart at `local.chart_root`.





### Required Parameters


- `dest` - The directory in which to render the chart. If the source chart is at `charts/src/nginx`, and `dest` is set to `charts/rendered/`, then the chart will be templated at `charts/rendered/nginx`



### Optional Parameters


- `github` - Configuration for indicating a chart hosted in a private or public github repo. Fields are same as `assets.v1.github`

    required:

  - `path` - Path in repo from which to pull file or directory

  - `ref` - Reference to a github commit to pull, usually a SHA or a tag -- usage of branches is supported but discouraged as content could change within a single Ship release

  - `repo` - The GitHub repository to pull from, formated as `owner`/`repo` e.g. `replicatedhq/ship`

    optional:

  - `proxy` - Boolean true or false, determines whether a repository is fetched via the Replicated API. Should be used for private repos.

  - `source` - Deprecated


- `helm_fetch` - Configuration for indicating a chart hosted somewhere that would be accessible to the `helm fetch` function.

    required:

  - `chart_ref` - `chart URL | repo/chartname` as would be passed to `helm fetch`

    optional:

  - `repo_url` - repository URL as would be passed to `helm fetch` with the `--repo` flag

  - `version` - version as would be passed to `helm fetch` with the `--version` flag


- `helm_opts` - Additional options as would be passed to `helm template`


- `local` - Configuration for indicating an already existing source chart to render from.

    required:

  - `chart_root` - The base directory of the existing chart.


- `values` - Values to set during rendering, overrides defaults in `values.yaml` if present in the chart root.


- `values_from` - values_from


- `when` - This asset will be included when 'when' is omitted or true


### Examples

```yaml
assets:
  v1:
    - helm:
        github:
          repo: github.com/replicatedhq/superbigtool-k8s
          ref: 8fcaebe55af67fe6789fa678faaa76fa867fbc
          path: k8s-yamls/
          proxy: true
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
