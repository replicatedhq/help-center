---
date: "2018-05-02T01:19:20Z"
title: "Kubernetes and Optional Secrets"
description: "Best practices for allowing configuration of optional secrets on Kubernetes"
weight: "44002"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Kubernetes and Optional Secrets" >}}

When distributing a Kubernetes application using Replicated Ship, it is almost certain that your application will require access to some form of secret, whether that be API keys, database information or something else.
In many cases, your application will require an encryption key to protect its data at rest.
Some people will be fine with deploying these secrets in the same way as they deploy the rest of their application yaml.
However, many enterprises will prefer to avoid committing secrets to version control, and instead will manage secrets yaml out-of-band.

With config options and template functions, we can satisfy both sets of customers.

First, we'll need a boolean option for the user to select, and the data we'll use to populate the secret.
In this case, nothing is visible to or configurable by the user - but we'll still be able to refer to it when templating assets.
```yaml
config:
  v1:
  - items:
    - name: create_secret
      type: bool
      title: Create Secrets
      value: false
    - name: redis_uri
      type: text
      hidden: true
      readonly: true
      value: 'redis://redis:6379'
    - name: pusher_key
      type: text
      hidden: true
      readonly: true
      value: '{{repl RandomString 32}}'
    - name: pusher_secret
      type: text
      hidden: true
      readonly: true
      value: '{{repl RandomString 32}}'
```

Now we can conditionally create the secret. 
We'll do this by making an inline asset that will be templated into the correct form depending on the options selected.

```yaml
assets:
  v1:
    - inline:
        dest: ./k8s/redis_secret.yml
        when: '{{repl ConfigOptionEquals "create_secret" 1}}'
        contents: |
          apiVersion: v1
          kind: Secret
          metadata:
            name: redis-secret
          type: Opaque
          data:
            redisUri: "{{repl ConfigOption "redis_uri" | Base64Encode}}"
            pusherKey: "{{repl ConfigOption "pusher_key" | Base64Encode}}"
            pusherSecret: "{{repl ConfigOption "pusher_secret" | Base64Encode}}"
```

If the user is fine with having secrets managed by Ship, the file will be created with the relevant contents.
Otherwise, no file will be created.