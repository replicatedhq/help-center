---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: A `github` asset is created from files downloaded from either a public or a linked Github repo.
index: docs
title: github
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## github

A `github` asset is created from files downloaded from either a public or a linked Github repo.


```yaml
assets:
  v1:
    - github:
        repo: github.com/replicatedhq/superbigtool-k8s
        ref: 8fcaebe55af67fe6789fa678faaa76fa867fbc
        path: k8s-yamls/
        dest: ./k8s/
        private: true
```

    
### Required Parameters


- `dest` - Destination directory


- `path` - Path in repo from which to pull file or directory


- `repo` - The GitHub repository to pull from, formated as `owner`/`repo` e.g. `replicatedhq/ship`


- `source` - One of `public` or `private`, if `private`, access to the repo can be validated on release creation


    
### Optional Parameters


- `ref` - Reference to a github commit to pull, usually a SHA or a tag -- usage of branches is supported but discouraged as content could change within a single Ship release


    
    