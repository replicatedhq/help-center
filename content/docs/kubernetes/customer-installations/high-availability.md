---
date: "2019-03-18T12:00:00Z"
title: "High Availability"
description: "Instructions for installing Replicated Embedded Kubernetes in high availability mode."
keywords: "installing, ha, high availability"
weight: "2705"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
aliases: [docs/distributing-an-application/high-availability]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

Replicated Embedded Kubernetes has the ability to run in highly available (multi-master) mode with multiple Kubernetes master control plane nodes. The addition of the `ha` flag when running the Kubernetes easy-install script signals to Replicated that this cluster should be run in HA mode. In addition to the cluster, the only other requirement is an external load balancer, which is necessary to expose the kube-apiserver to worker nodes. In order to upgrade an existing cluster to HA, just rerun the installation script with the addition of the `ha` flag.

```shell
curl -sSL -o install.sh  https://get.replicated.com/kubernetes-init
sudo bash ./install.sh ha
```

{{< linked_headline "Load Balancer" >}}

When installing a highly available cluster, the script will prompt for a load balancer address. The load balancer can be preconfigured by passing in the `load-balancer-address=<host:port>` flag. This load balancer should be configured to distribute traffic to all healthy control plane nodes in its target list. This should be a TCP forwarding load balancer. The health check for an apiserver is a TCP check on the port the kube-apiserver listens on (default value :6443). For more information on the kube-apiserver load balancer see https://kubernetes.io/docs/setup/independent/high-availability/#create-load-balancer-for-kube-apiserver. In the absence of a load balancer, all traffic will be routed to the first master.

The load balancer can be reconfigured later by rerunning the init script on one of the masters with the `load-balancer-address=<host:port>` flag. The script will prompt you to rerun the node join scripts on all other nodes. This is necessary to distribute the regenerated certificate files with the new load balancer address to the rest of the cluster.

{{< linked_headline "Adding Additional Masters" >}}

Once Replicated is installed on the first master, it is possible to add additional master nodes. On the Cluster page on the On-Prem Console an "Add Node" button will be visible with the option to generate a script to add an additional master or worker node. Additionally, the master node join script can be generated using the CLI command [`replicatedctl cluster node-join-script --master`](https://help.replicated.com/api/replicatedctl/replicatedctl_cluster_node-join-script/).

![Add Node Script](/images/post-screens/add-node-k8s-master.png)

{{< linked_headline "Control Plane Node Isolation" >}}

On a standard HA cluster application Pods will run on master nodes as well as worker nodes. An additional flag `taint-control-plane` has been provided to prevent Pods from running on master nodes alongside the control plane. This will add the `node-role.kubernetes.io/master: NoSchedule` taint to all master nodes. In this configuration, it is necessary to add worker nodes before the application can be scheduled.

```shell
curl -sSL -o install.sh  https://get.replicated.com/kubernetes-init
sudo bash ./install.sh ha taint-control-plane
```

{{< linked_headline "Loss of Node" >}}

When a node is unavailable for one hour, Replicated will automatically purge the node when running in HA mode.
The purge is required in order to reschedule any pods with PVCs that were running on the lost node.

{{< linked_headline "Known Issues" >}}

- Airgapped bundles and licenses are synced to all master nodes every hour. If the first master is lost before the sync completes, some release management features of the Replicated console will be unavailable.
- The [application shell alias](https://help.replicated.com/docs/kubernetes/packaging-an-application/application-properties/#shell-alias) will only work on the node on which the Replicated pod is scheduled.
- When two masters are joined simultaneously, Etcd can fail due to not enough started members.
