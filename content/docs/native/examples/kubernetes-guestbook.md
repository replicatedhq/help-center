---
date: "2017-03-17T00:00:00Z"
title: "Kubernetes Guestbook"
description: "The Kubernetes Guestbook Application, in a Replicated YAML."
weight: "405"
categories: [ "Examples" ]
index: "docs"
tags: ["Application YAML", "Kubernetes"]
---

## Guestbook
We've taken the standard Kubernetes Guestbook example application and wrapped it in a Replicated YAML to show you how this would look.

```yaml
---
# kind: replicated
replicated_api_version: "2.3.5"
version: "alpha"
name: "Guestbook"
properties:
  app_url: '{{repl ServiceAddress "frontend" 80 }}'
  logo_url: http://www.replicated.com/images/logo.png
  console_title: Guestbook Console

admin_commands:
- alias: redis-cli
  command: [redis-cli]
  run_type: exec
  selector:
    app: redis
    tier: backend
    role: master
  container: master # optional, will choose first in pod

config:
- name: frontend
  title: Frontend
  items:
  - name: frontend_replicas
    title: App Replicas
    type: text
    default: 2
- name: db
  title: DB
  items:
  - name: redis_slave_replicas
    title: Redis Slave Replicas
    type: text
    default: 2
- name: advanced
  title: Advanced
  items:
  - name: redis_pv_storage_class
    title: Redis PV Storage Class
    type: text
    default: slow

---
# kind: scheduler-kubernetes
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: redis-pvc
  labels:
    app: redis
  annotations:
    volume.alpha.kubernetes.io/storage-class: {{repl ConfigOption "redis_pv_storage_class" }}
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi

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
    # the port that this service should serve on
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
  # these labels can be applied automatically
  # from the labels in the pod template if not set
  # labels:
  #   app: redis
  #   role: master
  #   tier: backend
spec:
  # this replicas value is default
  # modify it according to your case
  replicas: 1
  # selector can be applied automatically
  # from the labels in the pod template if not set
  # selector:
  #   matchLabels:
  #     app: guestbook
  #     role: master
  #     tier: backend
  template:
    metadata:
      labels:
        app: redis
        role: master
        tier: backend
    spec:
      containers:
      - name: master
        image: gcr.io/google_containers/redis:e2e  # or just image: redis
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        ports:
        - containerPort: 6379
        volumeMounts:
        - mountPath: /redis-master-data
          name: data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: redis-pvc
      securityContext:
        seLinuxOptions:
          label: s0,c1

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
    # the port that this service should serve on
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
  # these labels can be applied automatically
  # from the labels in the pod template if not set
  # labels:
  #   app: redis
  #   role: slave
  #   tier: backend
spec:
  # this replicas value is default
  # modify it according to your case
  replicas: {{repl ConfigOption "redis_slave_replicas" }}
  # selector can be applied automatically
  # from the labels in the pod template if not set
  # selector:
  #   matchLabels:
  #     app: guestbook
  #     role: slave
  #     tier: backend
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
          # uncomment the line below.
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
  type: LoadBalancer
  ports:
    # the port that this service should serve on
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
  # these labels can be applied automatically
  # from the labels in the pod template if not set
  # labels:
  #   app: guestbook
  #   tier: frontend
spec:
  # this replicas value is default
  # modify it according to your case
  replicas: {{repl ConfigOption "frontend_replicas" }}
  # selector can be applied automatically
  # from the labels in the pod template if not set
  # selector:
  #   matchLabels:
  #     app: guestbook
  #     tier: frontend
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
          # line below.
          # value: env
        ports:
        - containerPort: 80
```
