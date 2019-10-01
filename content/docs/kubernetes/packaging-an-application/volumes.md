---
date: "2016-07-03T04:02:20Z"
title: "Volumes"
description: "An overview of the various sections of the Replicated YAML."
weight: "2603"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{< linked_headline "Persistent Volumes" >}}

Kubernetes applications often rely on persistent volumes (PVs) and persistent volume claims (PVCs) to manage data.
When Replicated creates a Kubernetes appliance, a custom storage class named `default` is automatically created that will be available to the application for persistent volumes provisioned by [Rook](https://rook.io).
Replicated will set the `storageClassName` on all PersistentVolumeClaims in your application, allowing customers to use an alternative provisioner, such as `standard` on GKE.

{{< linked_headline "Fine-Grained Provisioniong" >}}

Add the `replicated.com/no-rewrite-storage-class` annotation to any PVC or StatefulSet's volumeClaimTemplate to prevent Replicated from rewriting the storageClassName of that volume. You will need to ensure that an alternative storageClassName is set and a provisioner for that class is running in the customer's environment.

{{< linked_headline "Shared Filesystem" >}}

{{< warning title="Known Issues" >}}

Replicated 2.36.0 to 2.38.2 had a race condition that could cause Pods to run after failing to mount the shared filesystem.
Affected Pods would be writing to the ephemeral container filesystem rather than the shared filesystem.

{{< /warning >}}

Rook is not able to provision PVCs with an access mode of `ReadWriteMany`, but it does support a shared filesystem that can be mounted as a flexVolume.
This can be enabled in the `kubernetes` section of your yaml.

```yaml
kubernetes:
  shared_fs:
    enabled: true
    mount_paths:
    - /subdir1
```

Templating is supported on the `enabled` and `mount_paths` properties.

Once enabled, you can mount the shared fileystem in any of your pods, either from the root or at a subpath as shown in this example:

```yaml
---
#kind: scheduler-kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-deployment
  template:
    metadata:
      labels:
        app: my-deployment
    spec:
      containers:
      - name: ubuntu
        image: index.docker.io/ubuntu:16.04
        command:
        - /bin/sh
        - -c
        - 'sleep 3600'
        volumeMounts:
        - name: shared
          mountPath: /var/lib/shared
      volumes:
      - name: shared
        flexVolume:
          driver: ceph.rook.io/rook
          fsType: ceph
          options:
            fsName: rook-shared-fs
            clusterNamespace: rook-ceph
            path: /subdir1 #optional
```

When mounting a subdirectory as shown in the example above, you must add the path you are mounting to `kubernetes.shared_fs.mount_paths`.
Paths within the shared filesystem can be included in snapshots by adding them to the [backup](/docs/snapshots/kubernetes/) section of your yaml.

{{< linked_headline "Resources" >}}

For more information on using Persistent Volumes with Kubernetes, see the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

For information on snapshotting Kubernetes volumes, see the [Replicated snapshots documentation for Kubernetes](/docs/snapshots/kubernetes/).

For more information on managing the storage needs of Kubernetes in customer environments, see [Managing Storage](/docs/kubernetes/customer-installations/managing-storage/).
