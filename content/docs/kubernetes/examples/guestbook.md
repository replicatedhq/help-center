---
date: "2018-05-03T04:02:20Z"
title: "Kubernetes Kuard"
description: "A quick Kubernetes application on Replicated."
weight: "4402"
categories: [ "Kubernetes Examples" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

## Kubernetes Guestbook on Replicated

A very simple application that runs with Replicated and Kubernetes.

```yaml
---
# kind: replicated

replicated_api_version: 2.23.0
name: "Kubernetes Kuard Example"

properties:
  app_url: http://{{repl ConfigOption "hostname" }}
  console_title: "Kubernetes Kuard Example"

host_requirements:
  replicated_version: ">=2.38.0"

config:
- name: hostname
  title: Hostname
  description: Ensure this domain name is routable on your network.
  items:
  - name: hostname
    title: Hostname
    default: '{{repl ConsoleSetting "tls.hostname" }}'
    required: true
    type: text
    test_proc:
      display_name: Check DNS
      command: resolve_host

---
# kind: scheduler-kubernetes
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: kuard-deployment
  labels:
    app: kuard
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kuard
  template:
    metadata:
      labels:
        app: kuard
    spec:
      containers:
        - image: gcr.io/kuar-demo/kuard-amd64:1
          name: kuard
          ports:
            - containerPort: 8080
              name: http
---
# kind: scheduler-kubernetes
apiVersion: v1
kind: Service
metadata:
  name: kuard-service
spec:
  selector:
    app: kuard
  ports:
  - port: 80
    targetPort: 8080
---
# kind: scheduler-kubernetes
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: kuard-ingress
spec:
  backend:
    serviceName: kuard-service
    servicePort: 80
```
