---
date: "2018-05-02T01:19:20Z"
title: "Generating Random Passwords"
description: "Generate static password values that are unique to each customer's installation"
weight: "44005"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{<legacynotice>}}

{{< linked_headline "Managing Persistent Random Strings" >}}

When distributing an applications, it can be useful to generate passwords as part of the bootstrap process. For example, if your app bundles an SQL database, you'll want to set a password on this database, and allow other application components to use that password to access the data. This can be done through the use of a hidden, mutable string value and the `RandomString` template function.

```yaml
config:
  v1:
    - items:
      - name: db_password
        hidden: true
        value: '{{repl RandomString 32}}'
```

Assuming the `state.json` file is in the right location when ship is run by the end customer, this will ensure that the database password will only be generated one time, and any subsequent `ship` runs will read from the initially generated password.

This config item would behave exactly the same without `hidden: true`, besides being displayed to the user. However, you may not wish to allow the user to edit this password, as many databases support setting a root password during the initial configuration but require additional steps to change an existing password. If you wished to allow the user to view this password without editing it, you could add a readonly template function that referred to this value.

```yaml
config:
  v1:
    - items:
      - name: db_password
        hidden: true
        value: '{{repl RandomString 32}}'
      - name: db_password_view
        title: "The Database Password"
        readonly: true
        value: '{{repl ConfigOption "db_password" }}'
```

{{< linked_headline "Generating Ephemeral Random Strings" >}}

In some cases you may wish to generate a nonce that will be regenerated every time that ship is run. This can be done by using the same struture as the persistent password example but with the addition of `readonly: true`. Readonly values are not loaded from the saved `state.json` file, and so your random string will be recreated every time.

```yaml
config:
  v1:
    - items:
      - name: random_nonce
        hidden: true
        readonly: true
        value: '{{repl RandomString 32}}'
```
