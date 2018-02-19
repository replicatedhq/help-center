---
date: "2016-07-03T04:02:20Z"
title: "Environment Variables"
description: "Defining container environment variables and setting values dynamically"
weight: "204"
categories: [ "Packaging a Native Application" ]
index: "docs/native"
---

{{< linked_headline "Container Environment Variables" >}}

The 12-factor app encourages the use of environment variables for configuration, and Replicated supports this design pattern. You can specify
environment variables, which will be injected into a container when it's created.

Environment variables can be created with static values or customer supplied values.

Environment variables support the Replicated template library.

There is also a flag provided to exclude anything secret from the support bundle.

```yaml
  env_vars:
    - name: EXTERNAL_SERVICE_USERNAME
      value: myapp
    - name: JWT_SIGNING_KEY
      value: '{{repl ConfigOption "jwt_signing_key" }}'
      is_excluded_from_support: true

    - name: POSTGRES_URI
      value: 'postgres://{{repl ConfigOption "postgres_user"}}:{{repl ConfigOption "postgres_pass"}}@{{repl ConfigOption "postgres_host"}}:5432'
      is_excluded_from_support: true
      when: '{{repl ConfigOption "bring_own_postgres" "1"}}'
    - name: POSTGRES_URI
      value: 'postgres://myappuser:{{repl ConfigOption "generated_password"}}@{{repl NodePrivateIPAddress "DB" "postgres"}}:5432'
      is_excluded_from_support: true
      when: '{{repl ConfigOption "bring_own_postgres" "0"}}
```

{{< linked_headline "when" >}}

The `when` attribte will cause an environment variable not to be injected when the template evalulates to false. In the above example, only one `POSTGRES_URI` variable will be set in the container, depending on the value of the `bring_own_postgres` config option.

{{< linked_headline "is_excluded_from_support" >}}

Having environment variables in Support Bundles can be usedul whgen troubleshooting. However, environment variables can contain sensitive data.  Setting `is_excluded_from_support` to `true` will exclude them from Support Bundles. We recommend excluding any sensitive data from support bundles.
