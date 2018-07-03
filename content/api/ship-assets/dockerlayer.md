---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: A `dockerlayer` asset will pull an image from a public docker registry, registry.replicated.com, or a configured third party registry and produce a tar archive of the container image.
index: docs
title: dockerlayer
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## dockerlayer

A `dockerlayer` asset will pull an image from a public docker registry, registry.replicated.com, or a configured third party registry and produce a tar archive of the container image.


```yaml
assets:
  v1:
    - dockerlayer:
        image: 'quay.io/cooltool-enterprise/configs:1.0.1'
        dest: config/
        source: quayio-private
        layer: f7126e84abc96fbc8495c33052724fad48115829e86987adbf556474f0ead5c1
```

    
### Required Parameters


- `dest` - The directory in which the layer should be unpacked


- `image` - The docker image URL


- `layer` - a SHA256 of the layer to extract. You can inspect the layer SHAs of a docker image by running something like `docker save myimage > myimage.tar && tar xvf myimage.tar -C /tmp`. Ship will unpack the archive at `<layer sha>/layer.tar` to the `dest` directory.


- `source` - The source for the image. Should be either `public`, `replicated`, or the name of a third-party private registry previously configured on [console.replicated.com](https://console.replicated.com)


    
    