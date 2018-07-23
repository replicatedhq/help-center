---
date: "2018-03-03T04:02:20Z"
title: "Best Practices"
description: "Best practices when delivering applications with Ship"
weight: "40004"
categories: [ "Ship" ]
index: ["docs/ship", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Best Practices" >}}

Ship is flexible, but when you follow some best practices, the application installation and update is more predictable and familiar to the person installing. This makes it easier to install.

{{< linked_headline "Directories" >}}

When writing assets to disk on the installation machine, it's common to use the following directory structure.

```
./scripts
./images
./test
./observe
```

Note that it's not required or recommended to write these into a common parent directory. The installer can be run with this directory mounted to a custom location.

### scripts

The `scripts` directory should contain an `install.sh` script. This will be used to install the application.

### images

The `images` directory should contain all required docker images, necessary to deploy to an airgapped cluster.

### test

The `test` directory should contain everything necessary to test an installation, after it's deployed. This can be used to enable continuous delivery on enterprise clusters.

### observe

The `observe` directory should contain assets needed to configure a monitoring tool with dashboards and alerts. It's common to include some documentation here on how to read these metrics.

