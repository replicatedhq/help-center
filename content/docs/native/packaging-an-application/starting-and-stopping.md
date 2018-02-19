---
date: "2016-07-03T04:02:20Z"
title: "Starting and Stopping"
description: "Controlling the startup process of an individual a container"
weight: "208"
categories: [ "Packaging a Native Application" ]
index: "docs/native"
---


{{< linked_headline "CMD" >}}

It's possible to override the `CMD` and/or `ENTRYPOINT` in a container, when using the Replicated Native Scheduler:

```yaml
  - source: public
    image_name: redis
    ...
    entrypoint: '["redis-server"]'
    cmd: '["--appendonly", "yes"]'
```
