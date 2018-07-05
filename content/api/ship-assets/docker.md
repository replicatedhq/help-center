---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: A `docker` asset will pull an image from a public docker registry, registry.replicated.com, or a configured third party registry and produce a tar archive of the container image.
index: docs
title: docker
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## docker

A `docker` asset will pull an image from a public docker registry, registry.replicated.com, or a configured third party registry and produce a tar archive of the container image.


```yaml
assets:
  v1:
    - docker:
        image: 'quay.io/cooltool-enterprise/api:1.0.1'
        source: quayio-private
        dest: images/api.tar
```

```yaml
assets:
  v1:
    - docker:
        image: 'registry.replicated.com/cooltool/worker:1.1.0'
        dest: images/worker.tar
        source: replicated
```

```yaml
assets:
  v1:
    - docker:
        image: 'postgres:9.6'
        dest: images/postgres.tar
        source: public
        mode: 600
```

    
### Required Parameters


- `dest` - The destination for the docker image, such as `api.tar` or `docker-images/worker.tar`.


- `image` - The docker image URL


- `source` - The source for the image. Should be either `public`, `replicated`, or the name of a third-party private registry previously configured on [console.replicated.com](https://console.replicated.com)


    
### Optional Parameters


- `mode` - The unix file permissions to be set on the image tar archive, e.g `600`.


    
    