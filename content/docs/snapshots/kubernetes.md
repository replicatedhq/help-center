---
date: "2017-08-31T00:00:00Z"
title: "Kubernetes"
description: "Configuring Snapshots on Kubernetes"
weight: "2208"
categories: [ "Snapshots" ]
index: "other"
aliases: [/docs/packaging-an-application/kubernetes-snapshots/]
nextPage: "ldap-and-identity/overview.md"
---

Kubernetes Snapshots can be used to configure incremental backups for any Kubernetes resources
that use a [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) (PVC)
for persistent storage.
If your application has [a Rook shared filesystem enabled](/docs/kubernetes/packaging-an-application/volumes/)
any paths on the filesystem can be included in the snapshot.

{{< linked_headline "Configuration" >}}

In addition to storing your application data in a PVC, you'll need to enable it
in your Replicated application yaml's `backup` section. For example, to back up a PVC named
`redis-data-volume`, use the following `backup` config.

```yaml
backup:
  enabled: true
  kubernetes:
    pvc_names: [ "redis-data-volume" ]
```

Paths in the shared filesystem must also be listed.
To backup the entire shared filesystem, use the root path.

```yaml
backup:
  enabled: true
  kubernetes:
    shared_fs_paths: [ "/" ]
```

[Multi-strategy snapshots](/docs/snapshots/custom-scripts/#multi-strategy-backup) can also be used with Kubernetes.

When configuring multi-strategy snapshots, all PVCs and shared filesystem paths should be included under the same strategy.

```yaml
...
backup:
  enabled: true
  strategies:
    - name: full
      kubernetes:
        pvc_names: [ "redis-data-volume" ]
        shared_fs: [ "/dump" ]
...
```

{{< linked_headline "StatefulSets" >}}

All PersistentVolumeClaims generated from a [StatefulSet's volumeClaimTemplates](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) will be included in a snapshot if the name in the `volumeClaimTemplate` matches a name in the backup list of PVCs.

For example, with the following yaml two PersistentVolumeClaims would be generated: `www-web-0` and `www-web-1`.
Both would be included in your snapshots because both include `www`.

```yaml
backup:
  enabled: true
  kubernetes: pvc_names: ["www"]

---
#kind: scheduler-kubernetes
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  selector:
    matchLabels:
      app: nginx
  serviceName: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: k8s.gcr.io/nginx-slim:0.8
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi
```

{{< linked_headline "Example" >}}

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
replicated primary's PVC by default (`local` mode). This is not recommended for production deployments, and end users of replicated are encouraged to customize the
backup implementation in the Replicated Admin Console under "Console Settings". Options include using either SFTP or Amazon S3 for snapshot storage.

See the [Snapshots](/docs/packaging-an-application/snapshots/) documentation for more information on configuring snapshot storage.
