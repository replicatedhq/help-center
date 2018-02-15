---
date: "2017-03-16T00:00:00Z"
title: "Installing Replicated on Kubernetes"
description: "Instructions for installing Replicated on a Kubernetes cluster."
keywords: "installing, kubernetes"
hideFromList: true
index: "docs"
tags: ["Installing Replicated", "Kubernetes"]
categories: [ "Distributing an Application" ]
---

We distribute standard Kubernetes YAML that can be used to install Replicated onto an existing Kubernetes cluster.

### Basic Install

Download and save the YAML to a file and then use `kubectl` to create it on your cluster.

```shell
curl -sSL -o replicated.yml https://get.replicated.com/kubernetes.yml
kubectl apply -f replicated.yml
```

Quick install:

```shell
kubectl apply -f https://get.replicated.com/kubernetes.yml
```

{{< linked_headline "Prerequisites" >}}

The Kubernetes cluster must already be provisioned.

### Volumes
Replicated requires two persistent volumes on the cluster named `replicated-pv` and `replicated-statsd-pv` with a minimum size of 10GB. However these persistent volumes are created is fine as long as they are created prior to installing Replicated.

#### Running on GKE

Create the disks for the persistent volumes:

```bash
gcloud compute disks create --size=10GB --zone=<zone> replicated-pv
gcloud compute disks create --size=10GB --zone=<zone> replicated-statsd-pv
```

Create the volumes:

replicated.pv

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
 name: replicated-pv
spec:
 capacity:
   storage: 10Gi
 accessModes:
   - ReadWriteOnce
 gcePersistentDisk:
   pdName: replicated-pv
   fsType: ext4
```

replicated-statsd.pv

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
 name: replicated-statsd-pv
spec:
 capacity:
   storage: 10Gi
 accessModes:
   - ReadWriteOnce
 gcePersistentDisk:
   pdName: replicated-statsd-pv
   fsType: ext4
```

Finally add them by running:

```shell
kubectl create -f replicated.pv
kubectl create -f replicated-statsd.pv
```

#### Running Elsewhere

For other environments start with the YAML found below and update the spec to use the persistent volume option that is best suited to your environment. The provided YAML uses hostPath which is not recommended for production but a better selection depends on your environment.

replicated.pv

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
 name: replicated-pv
spec:
 capacity:
   storage: 10Gi
 accessModes:
   - ReadWriteOnce
 hostPath:
   path: "/tmp/data/replicated"
```

replicated-statsd.pv


```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
 name: replicated-statsd-pv
spec:
 capacity:
   storage: 10Gi
 accessModes:
   - ReadWriteOnce
 hostPath:
   path: "/tmp/data/replicated-statsd"
```

Once updated run:

```shell
kubectl create -f replicated.pv
kubectl create -f replicated-statsd.pv
```