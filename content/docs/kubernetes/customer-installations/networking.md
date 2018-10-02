---
date: "2018-06-27T23:02:20Z"
title: "Networking"
description: "Managing networking in your Kubernetes cluster"
weight: "2711"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

Replicated uses [Weave](https://www.weave.works/docs/net/latest/kubernetes/kube-addon/) to assign IP addresses to pods and connect them across multiple hosts.
Weave runs as a DaemonSet in the `kube-system` namespace and includes a controller to support [Network Policy](https://kubernetes.io/docs/concepts/services-networking/network-policies/) resource types.

{{< linked_headline "Encryption" >}}

Replicated will configure Weave to encrypt all traffic between hosts in your clusters by default.
As a performance optimization, you can disable this behavior in a trusted network by passing the `encrypt_network=0` param to the kubernetes-init install script:
```bash
curl -sSL https://get.replicated.com/kubernetes-init | sudo bash -s encrypt-network=0
```

If Weave is not able to configure an IPSec tunnel with the ESP protocol then encrypted traffic may be routed through a slower tunnel known as `sleeve`.
This will happen when running on a kernel version below Linux 4.2 or when a firewall rule is blocking `esp` packets.

{{< linked_headline "Troubleshooting" >}}

You can determine whether weave is making encrypted connections between hosts by running the `weave status` command on a Weave pod.

```shell
WEAVE_POD=$(kubectl -n kube-system get pods | grep weave-net | awk '{ print $1 }' | head -1)
kubectl -n kube-system exec $WEAVE_POD -c weave -- /home/weave/weave --local status
```

You can use the `weave status connections` command to determine whether connections between hosts are using `sleeve` or the `fast datapath`.
```shell
WEAVE_POD=$(kubectl -n kube-system get pods | grep weave-net | awk '{ print $1 }' | head -1)
kubectl -n kube-system exec $WEAVE_POD -c weave -- /home/weave/weave --local status connections
```
