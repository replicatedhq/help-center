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


```yaml
assets:
  v1:
    - inline:
        dest: install.sh
        mode: 755
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

    
### Required Parameters


- `contents` - The contents of the file


- `dest` - A path to which the file should be written when generating assets


    
### Optional Parameters


- `mode` - Specifies file mode of the created asset, defaults to `0644`


    
    