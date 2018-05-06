---
date: "2018-05-02T01:19:20Z"
title: "Config Overview"
description: "Introduction to the Ship Config syntax"
weight: "43002"
categories: [ "Ship Config" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Ship Config" >}}

The config key is where you can define the dynamic values that end customers need to configure before they can use your application. It might include things like:

- External Database connection details and credentials
- Other internal integrations settings like SMTP auth or API keys
- Tunable settings for your application like "number of worker processes" or "log level"

In Replicated Ship, a simple config section with one item might look like

```yaml
config:
  v1:
    - name: "database_info"
      title: "Database Info"
      items:
        - name: pg_connstring
          title: "Connection string for the PostgreSQL server"
          type: text
```

The configuration options API is identical to that used for applications managed by Replicated's scheduler suite, and the documentation can be found at [Config Screen YAML](/docs/config-screen/config-yaml/).
