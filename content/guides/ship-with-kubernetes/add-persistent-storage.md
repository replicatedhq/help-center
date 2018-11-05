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

{{< linked_headline "Replication" >}}

Replicated's install script will default to creating a cluster backed by the host directory `/opt/replicated/rook`.
Each file in the cluster begins with a single copy, i.e. without replication.
When a new node is added to the cluster, you can edit the Pool custom resource named `replicapool` in the `rook-ceph` namespace and configure it to store copies of each file on two separate hosts:

```shell
kubectl -n rook-ceph patch pool replicapool --type='json' -p='[{"op": "replace", "path": "/spec/replicated/size", "value": 2}]'
```

{{< linked_headline "Dynamic Provisioning in Cloud Environments" >}}

The [Cloud Controller Manager (CCM)](https://kubernetes.io/docs/concepts/architecture/cloud-controller/) was introduced in Kuberentes 1.6 to offload control loops that integrate with cloud services from the [Kubernetes Controller Manager (KCM)](https://kubernetes.io/docs/concepts/overview/components/#kube-controller-manager).
Three of the four cloud dependent controllers - node, route, and service - have been moved to the Cloud Controller Manager.
A fourth, the volume controller, was replaced with the Flex Volume plugin framework rather than being ported directlly from the KCM to the CCM.
As of Kubernetes 1.10, a newer plugin system, [Container Storage Interface (CSI)](https://github.com/container-storage-interface/spec/blob/master/spec.md) has been designated as the successor to Flex Volumes.
CSI plugins are similar to Flex Volumes but run in pods rather than as binaries on the host.

Replicated is monitoring progress of the CSI framework and may add support for plugins that will dynamically provision volumes such as EBS on AWS.
For now, customers who wish to use EBS volumes with Replicated may choose to mount a volume on each host at `/opt/replicated/rook`, effectively backing Rook with EBS storage.
Alternatively, Rook can be disabled entirely by setting the `storage_provisioner` parameter to 0, which would require sysadmins to manually provision an EBS volume for each of the four Persistent Volume Claims defined by Replicated in addition to any required to run your app.

{{< linked_headline "Tips" >}}

- Deployments with Pods that mount Persistent Volumes should specify an update strategy type of `Recreate` or a `RollingUpdate` with a `maxUnavailable` value of `1`.
- The default `RollingUpdate` with `maxUnavailable` value of `25%` will prevent old Pods from terminating and yielding their Persistent Volumes, which will keep new Pods from starting.

For more information on managing the storage needs of Kubernetes in customer environments, see [Managing Storage](/docs/kubernetes/customer-installations/managing-storage/).
