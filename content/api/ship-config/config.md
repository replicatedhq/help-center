---
categories:
- ship-config
date: 2018-01-17T23:51:55Z
description: Reference Documentation for defining your Ship application configuration options 
index: docs
title: Config
weight: "1"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## Ship Config

This is the reference documenation for Ship config. To get started with Ship, head on over to [Ship Guides](/guides/ship/).

Config is where you can define the dynamic values that end customers need to configure before they can use your application. It might include things like: 

  - External Database connection details and credentials
  - Other internal integrations settings like SMTP auth or API keys
  - Tunable settings for your application like "number of worker processes" or "log level"
  
In ship, a minimal config section with one item might look like

```yaml
config:
  v1:
    - name: "database_info"
      title: "Database Info"
      items:
        - name: pg_connstring
          title: "connection string for a PostgreSQL server"
```
  
The configuration options API is identical to that used for applications managed by
Replicated's scheduler suite, and the documentation can be found at [Config Screen YAML
](/docs/config-screen/config-yaml/).


We're always interested to hear more about how you're deploying your application to your customers, if there's a config option type you'd like to see, drop us a line at https://vendor.replicated.com/support or https://help.replicated.com/community.

