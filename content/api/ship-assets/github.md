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





### Required Parameters


- `dest` - Destination directory


- `path` - Path in repo from which to pull file or directory


- `repo` - The GitHub repository to pull from, formated as `owner`/`repo` e.g. `replicatedhq/ship`


- `source` - One of `public` or `private`, if `private`, access to the repo can be validated on release creation



### Optional Parameters


- `mode` - If present, overrides the file mode of all files included by this asset.


- `ref` - Reference to a github commit to pull, usually a SHA or a tag -- usage of branches is supported but discouraged as content could change within a single Ship release


- `strip_path` - If true, the github directory will not be included in the filepath of the generated files. For instance, when outputting all files within 'source/' in the repository to the 'dest/' directory, the file 'source/a/file.txt' would be placed at 'dest/source/a/file.txt' when this is false and 'dest/a/file.txt' when this is true.


- `when` - This asset will be included when 'when' is omitted or true


### Examples

```yaml
assets:
  v1:
    - github:
        repo: github.com/replicatedhq/superbigtool-k8s
        ref: 8fcaebe55af67fe6789fa678faaa76fa867fbc
        path: k8s-yamls/
        dest: ./k8s/
        source: private
        strip_path: ''
```

```yaml
assets:
  v1:
    - github:
        repo: github.com/replicatedhq/ship
        ref: master
        path: hack/docs/
        dest: './docs{{repl Add 1 1}}/'
        source: public
        mode: 644
        strip_path: '{{repl ParseBool "true"}}'
```
