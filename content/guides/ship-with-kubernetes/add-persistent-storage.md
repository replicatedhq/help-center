---
date: "2018-01-30T04:02:20Z"
title: "Add persistent Storage"
description: "Adding persistent volumes to your application for resilient storage of application data"
weight: "11005"
categories: [ "Kubernetes Guide" ]
index: "guides/kubernetes"
type: "chapter"
gradient: "kubernetes"
icon: "replicatedKubernetes"
aliases: [guides/ship-with-kubernetes/managing-storage]
nextPage: "kubernetes/getting-started/overview.md"
---

{{< linked_headline "Persistent Storage" >}}

When your application needs to ship a database, blob store, or other means of persisting its data,
it's useful to use kubernetes [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) to manage the persistence and redundancy
of that storage. This chapter give you a brief intro to how Replicated manages Persistent Volumes in Kubernetes, and some tips on how to leverage them to ship databases and other storage technology alongside your application.

{{< linked_headline "Leveraging PVCs in StatefulSets" >}}

For most stateful deployments, you'll want to include a Kubernetes [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) in your application. These are similar to Deployments,
but with some extra features for stateful components, including direct integration with Persistent Volumes.

An example StatefulSet is shown below, note especially the `volumeClaimTemplates` field, which is
used to configure how Persistent Volumes are allocated.

```sh
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  selector:
    matchLabels:
      app: mysql
  serviceName: "mysql"
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:5
        ports:
        - containerPort: 3306
          name: mysql
  volumeClaimTemplates:
  - metadata:
      name: mysql
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "default"
      resources:
        requests:
          storage: 100Gi
```

{{< linked_headline "Rook" >}}

Replicated's Kubernetes scheduler uses [Rook](https://rook.io/) to dynamically provision storage for Persistent Volume Claims required by Replicated and your app.
Alternatively, Rook can be disabled entirely by setting the `storage_provisioner` parameter to 0, which would require sysadmins to manually provision an EBS volume for each of the four Persistent Volume Claims defined by Replicated in addition to any required to run your app.

{{< linked_headline "Replication" >}}

Replicated's install script will default to creating a cluster backed by the host directory `/opt/replicated/rook`.
Each file in the cluster begins with a single copy, i.e. without replication.
When a node is added or removed from the cluster, Replicated will automatically adjust the replication level up to a maximum of 3.

Prior to Replicated 2.30, customers had to manually increase the replication level with the following command:

```shell
kubectl -n rook-ceph patch pool replicapool --type='json' -p='[{"op": "replace", "path": "/spec/replicated/size", "value": 2}]'
```

{{< linked_headline "Tips" >}}

- Deployments with Pods that mount Persistent Volumes should specify an update strategy type of `Recreate` or a `RollingUpdate` with a `maxUnavailable` value of `1`.
- The default `RollingUpdate` with `maxUnavailable` value of `25%` will prevent old Pods from terminating and yielding their Persistent Volumes, which will keep new Pods from starting.

For more information on managing the storage needs of Kubernetes in customer environments, see [Managing Storage](/docs/kubernetes/customer-installations/managing-storage/).
