---
date: "2019-03-18T12:00:00Z"
title: "High Availability"
description: "Instructions for installing Replicated Embedded Kubernetes in high availability mode."
keywords: "installing, ha, high availability"
weight: "2707"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
aliases: [docs/distributing-an-application/high-availability]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

Replicated Embedded Kubernetes has the ability to run in highly available mode with multiple Kubernetes control plane nodes. The addition of the `ha` flag when running the Kubernetes easy-install script signals to Replicated that this cluster should be run in HA mode. In addition to the cluster, the only other requirement is an external load balancer, which is necessary to expose the kube-apiserver to secondary nodes. In order to upgrade an existing cluster to HA, just rerun the installation script with the addition of the `ha` flag.

```shell
curl -sSL -o install.sh  https://get.replicated.com/kubernetes-init
sudo bash ./install.sh ha
```

{{< linked_headline "Load Balancer" >}}

When installing a highly available cluster, the script will prompt for a load balancer address. The load balancer can be preconfigured by passing in the `load-balancer-address=<host:port>` flag. This load balancer should be configured to distribute traffic to all healthy control plane nodes in its target list. This should be a TCP forwarding load balancer. The health check for an apiserver is a TCP check on the port the kube-apiserver listens on (default value :6443). For more information on the kube-apiserver load balancer see https://kubernetes.io/docs/setup/independent/high-availability/#create-load-balancer-for-kube-apiserver. In the absence of a load balancer, all traffic will be routed to the first primary.

The load balancer can be reconfigured later by rerunning the init script on one of the primary nodes with the `load-balancer-address=<host:port>` flag. The script will prompt you to rerun the node join scripts on all other nodes. This is necessary to distribute the regenerated certificate files with the new load balancer address to the rest of the cluster.

{{< linked_headline "Adding Additional Primary Nodes" >}}

Once Replicated is installed on the first primary, it is possible to add additional primary nodes. On the Cluster page on the On-Prem Console an "Add Node" button will be visible with the option to generate a script to add an additional primary or secondary node. Additionally, the primary node join script can be generated using the CLI command [`replicatedctl cluster node-join-script --primary`](https://help.replicated.com/api/replicatedctl/replicatedctl_cluster_node-join-script/).

![Add Node Script](/images/post-screens/add-node-k8s-master.png)

{{< linked_headline "Control Plane Node Isolation" >}}

On a standard HA cluster application Pods will run on primary nodes as well as secondary nodes. An additional flag `taint-control-plane` has been provided to prevent Pods from running on primary nodes alongside the control plane. This will add the `node-role.kubernetes.io/master: NoSchedule` taint to all primary nodes. In this configuration, it is necessary to add secondary nodes before the application can be scheduled.

```shell
curl -sSL -o install.sh  https://get.replicated.com/kubernetes-init
sudo bash ./install.sh ha taint-control-plane
```

{{< linked_headline "Loss of Node" >}}

When a node is unreachable for more than forty seconds, Kubernetes will change the node's ready status to `Unknown`.
After five minutes in the Unknown state, Kubernetes will delete all pods on the unreachable node so they can be rescheduled on healthy nodes.
The deleted pods are likely to remain in the Terminating state since kubelet will not be reachable to confirm the pods have stopped.
If a pod mounts a PVC it will maintain its lock on the PVC while stuck in the Terminating state and replacement pods will not be able to start.
This can cause applications using PVCs to be unavailable longer than the five minute grace period applied by Kubernetes.

For this reason, the `rek-operator` deployment on HA installations will watch for nodes in the Unknown state for more than five minutes and force delete all pods on them that have been terminating for at least thirty seconds.

If a node is lost, the cluster will be degraded until the node is cleaned up.
In a degraded state new nodes will not be able to join the cluster, the cluster cannot be upgraded, and cluster components will report health warnings.
Use this command to permanently remove a node that will not be rejoining the cluster:

```bash
replicatedctl cluster delete-node <node>
```

{{< linked_headline "Known Issues" >}}

- Airgapped bundles and licenses are synced to all primary nodes every hour. If the first primary is lost before the sync completes, some release management features of the Replicated console will be unavailable.
- The [application shell alias](/docs/kubernetes/packaging-an-application/application-properties/#shell-alias) will only work on the node on which the Replicated pod is scheduled.
- When two primary nodes are joined simultaneously, Etcd can fail due to not enough started members.
