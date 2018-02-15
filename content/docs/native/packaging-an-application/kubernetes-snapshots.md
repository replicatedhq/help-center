---
date: "2017-08-31T00:00:00Z"
title: "Kubernetes Snapshots"
description: "Application Snapshots on Kubernetes"
weight: "219"
categories: [ "Packaging an application" ]
tags: ["Application YAML", "Kubernetes", "Snapshots"]
aliases: []
---

Kubernetes Snapshots can be used to configure incremental backups for any Kubernetes resources
that use a [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) (PVC)
for persistent storage.

### Configuration

In addition to storing your application data in a PVC, you'll need to whitelist it
in your Replicated application yaml's `backup` section. For example, to back up a PVC named
`redis-data-volume`, use the following `backup` config.

```yaml
backup:
  enabled: true
  kubernetes:
    pvc_names: [ "redis-data-volume" ]
```

### Example

Below is an End-to-end application config for a PVC-backed redis deployment.

```yaml
---
# kind: replicated
replicated_api_version: 2.11.0
name: Redis-K8s

backup:
  enabled: true
  kubernetes:
    pvc_names: [ "redis-data-volume" ]

host_requirements:
  replicated_version: ">=2.11.0"
properties:
  logo_url: https://redis.io/images/redis-white.png
  console_title: Persistent Redis Example

---
# kind: scheduler-kubernetes
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: redis-data-volume
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  annotations:
    volume.beta.kubernetes.io/storage-class: standard
---
#kind: scheduler-kubernetes
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: redis
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: redis
          image: redis:3.0
          command:
            - redis-server
            - --appendonly
            - "yes"
          volumeMounts:
            - name: redis-data
              mountPath: /data
          ports:
            - containerPort: 6379
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: redis-data-volume
```

### Configuring Snapshot Storage

When installing Replicated, application backup archives will be stored on the
replicated master's PVC by default (`local` mode). This is not recommended for production deployments, and end users of replicated are encouraged to customize the
backup implementation in the Replicated Admin Console under "Console Settings". Options include using either SFTP or Amazon S3 for snapshot storage.

See the [Snapshots](/docs/packaging-an-application/snapshots/) documentation for more information on configuring snapshot storage.
