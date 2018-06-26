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

replicated_api_version: 2.9.2
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
  replicated_version: ">=2.9.2"

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

#
# Images
#
images:
- name: k8s.gcr.io/redis
  source: public
  tag: e2e
- name: gcr.io/google_samples/gb-redisslave
  source: public
  tag: v1
- name: gcr.io/google-samples/gb-frontend
  source: public
  tag: v4

#
# Documentation for additional features
# https://help.replicated.com/categories/packaging-an-application/
#

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

apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: redis-master
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: redis
        role: master
        tier: backend
    spec:
      containers:
      - name: master
        image: k8s.gcr.io/redis:e2e  # or just image: redis
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
  name: redis-slave
  labels:
    app: redis
    tier: backend
    role: slave
spec:
  ports:
  - port: 6379
  selector:
    app: redis
    tier: backend
    role: slave
---
# kind: scheduler-kubernetes

apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: redis-slave
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: redis
        role: slave
        tier: backend
    spec:
      containers:
      - name: slave
        image: gcr.io/google_samples/gb-redisslave:v1
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        env:
        - name: GET_HOSTS_FROM
          value: dns
          # If your cluster config does not include a dns service, then to
          # instead access an environment variable to find the master
          # service's host, comment out the 'value: dns' line above, and
          # uncomment the line below:
          # value: env
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
  # if your cluster supports it, uncomment the following to automatically create
  # an external load-balanced IP for the frontend service.
  # type: LoadBalancer
  ports:
  - port: 80
  selector:
    app: guestbook
    tier: frontend
---
# kind: scheduler-kubernetes

apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 3
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
          # If your cluster config does not include a dns service, then to
          # instead access environment variables to find service host
          # info, comment out the 'value: dns' line above, and uncomment the
          # line below:
          # value: env
        ports:
        - containerPort: 80

```
