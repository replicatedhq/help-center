---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: A `docker` asset will pull an image from registry.replicated.com or from a configured third party private registry and produce a tar archive of the container image.
index: docs
title: docker
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## docker

A `docker` asset will pull an image from registry.replicated.com or from a configured third party private registry and produce a tar archive of the container image.


```yaml
assets:
  v1:
    - docker:
        image: 'quay.io/cooltool-enterprise/api:1.0.1'
        dest: images/api.tar
        source: quayio-private
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
```

    
### Required Parameters


- `dest` - The destination for the docker image, such as `api.tar` or `docker-images/worker.tar`.


- `image` - The destination for the docker image, such as `api.tar` or `docker-images/worker.tar`.


- `source` - The source for the image. Should be either `public`, `replicated`, or the name of a third-party private registry previously configured on [vendor.replicated.com](https://vendor.replicated.com)


    
### Optional Parameters


- `mode` - The unix file permissions to be set on the image tar archive, e.g `600`


    
    