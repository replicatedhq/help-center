---
date: "2016-07-03T04:02:20Z"
title: "Starting and Stopping"
description: "Controlling the startup process of an individual a container"
weight: "208"
categories: [ "Packaging a Native Application" ]
index: "docs/native"
---


{{< linked_headline "CMD" >}}

Next we can optionally define a container CMD to execute when running our container.

```yaml
  - source: public
    image_name: redis
    ...
    cmd: '["redis-server", "--appendonly", "yes"]'
```


{{< note title="Sensitive data" >}}
Having environment variables in Support Bundles can be invaluable for troubleshooting.   However, environment variables can contain sensitive data.  Setting `is_excluded_from_support` to `true` will exclude them from Support Bundles.
{{< /note >}}
