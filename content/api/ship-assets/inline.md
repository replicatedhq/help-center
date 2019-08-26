---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: An `inline` asset is one that is specified directly in your Ship application's spec.
index: docs
title: inline
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle)

## inline

An `inline` asset is one that is specified directly in your Ship application's spec.





### Required Parameters


- `contents` - The contents of the file


- `dest` - A path to which the file should be written when generating assets



### Optional Parameters


- `mode` - Specifies file mode of the created asset, defaults to `0644`. Make sure to include a leading `0` if specifying an octal value


- `when` - This asset will be included when 'when' is omitted or true


### Examples

```yaml
assets:
  v1:
    - inline:
        dest: install.sh
        contents: >-
          #!/bin/sh

          kubectl apply -f ./deploy.yml -n {{repl ConfigOption "k8s_namespace"
          }}
```

```yaml
assets:
  v1:
    - inline:
        dest: deploy.yml
        contents: |+

          apiVersion: extensions/v1beta1
          kind: Deployment
          metadata:
            name: api
          spec:
            replicas: 1
            template:
              metadata:
                labels:
                  app: retraced
                  tier: api
              spec:
                volumes:
                  - name: var-run
                    hostPath:
                      path: /var/run/retraced/
                imagePullSecrets:
                  - name: quayio
                containers:
                  - name: api
                    image: quay.io/retracedhq/api:{{ tag }}
                    ports:
                      - containerPort: 3000

```
