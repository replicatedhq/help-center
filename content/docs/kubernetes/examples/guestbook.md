---
date: "2018-05-03T04:02:20Z"
title: "Kubernetes Guestbook"
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
name: "Kubernetes Guestbook Example"

#
# https://help.replicated.com/docs/packaging-an-application/application-properties/
#
properties:
  app_url: http://{{repl ConfigOption "hostname" }}
  console_title: "Kubernetes Guestbook Example"

#
# https://help.replicated.com/docs/kb/supporting-your-customers/install-known-versions/
#
host_requirements:
  replicated_version: ">=2.23.0"

#
# Settings screen
# https://help.replicated.com/docs/packaging-an-application/config-screen/
#
config:
- name: hostname
  title: Hostname
  description: Ensure this domain name is routable on your network.
  items:
  - name: hostname
    title: Hostname
    value: '{{repl ConsoleSetting "tls.hostname" }}'
    type: text
    test_proc:
      display_name: Check DNS
      command: resolve_host

images:
# Image pushed to registry.replicated.com/k8shelpexample/redis.
# Only needs to be specified here for inclusion in airgap installs.
- name: redis
  source: replicated
  tag: e2e

# External image in private docker hub registry index.docker.io/replicated/examples.
# Configured in vendor.replicated.com as "dockerhub" with endpoint "index.docker.io".
# Needs to be specified here for both online and airgap installs.
- name: replicated/examples
  source: dockerhub
  tag: redisreplica-v1

# Public image, only needs to be specified here for inclusion in airgap installs.
- name: gcr.io/google-samples/gb-frontend
  source: public
  tag: v4

---
# kind: scheduler-kubernetes

apiVersion: v1
kind: Service
metadata:
  name: redis-master
  labels:
    app: redis
    tier: backend
    role: master
spec:
  ports:
  - port: 6379
    targetPort: 6379
  selector:
    app: redis
    tier: backend
    role: master
---
# kind: scheduler-kubernetes

apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-master
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
      role: master
      tier: backend
  template:
    metadata:
      labels:
        app: redis
        role: master
        tier: backend
    spec:
      containers:
      - name: master
        image: registry.replicated.com/k8shelpexample/redis:e2e
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        ports:
        - containerPort: 6379
---
# kind: scheduler-kubernetes

apiVersion: v1
kind: Service
metadata:
  name: redis-replica
  labels:
    app: redis
    tier: backend
    role: replica
spec:
  ports:
  - port: 6379
  selector:
    app: redis
    tier: backend
    role: replica
---
# kind: scheduler-kubernetes

apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-replica
spec:
  replicas: 2
  selector:
    matchLabels:
      app: redis
      role: replica
      tier: backend
  template:
    metadata:
      labels:
        app: redis
        role: replica
        tier: backend
    spec:
      containers:
      - name: replica
        image: index.docker.io/replicated/examples:redisreplica-v1
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        env:
        - name: GET_HOSTS_FROM
          value: dns
        ports:
        - containerPort: 6379
---
# kind: scheduler-kubernetes

apiVersion: v1
kind: Service
metadata:
  name: frontend
  labels:
    app: guestbook
    tier: frontend
spec:
  ports:
  - port: 80
  selector:
    app: guestbook
    tier: frontend
---
# kind: scheduler-kubernetes

apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: guestbook
      tier: frontend
  template:
    metadata:
      labels:
        app: guestbook
        tier: frontend
    spec:
      containers:
      - name: php-redis
        image: gcr.io/google-samples/gb-frontend:v4
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        env:
        - name: GET_HOSTS_FROM
          value: dns
        ports:
        - containerPort: 80
```
