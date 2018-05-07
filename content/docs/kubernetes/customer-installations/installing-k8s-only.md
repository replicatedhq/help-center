---
date: "2016-07-03T04:02:20Z"
title: "Installing Kubernetes Only"
description: "Instructions for installing a Kubernetes cluster using the Replicated installation script."
keywords: "installing, removing, migrating"
weight: "2706"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
aliases: [docs/distributing-an-application/installing-on-kubernetes]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

The Replicated installation script can be used to install Docker and Kubernetes in an airgapped environment, and not install Replicated to the cluster. This is useful when you want to use another method to distribute you application, such as [Helm](/guides/helm-application/).

{{< linked_headline "Basic install (recommended):" >}}

The basic install will install Docker, Kubernetes by pulling the scripts and resources from the Internet. It will save the install script to a file which you can inspect and then run. We recommend reading and understanding the install script prior to running.

```shell
curl -sSL -o install.sh  https://get.replicated.com/kubernetes-init
sudo bash ./install.sh -s kubernetes-only
```

{{< linked_headline "Quick Install" >}}

The quick Kubernetes install will install Docker, Kubernetes and Replicated. Use this method if you have no need to view/change the installer script and you just want a one-line install.

```shell
curl -sSL https://get.replicated.com/kubernetes-init | sudo bash -s kubernetes-only
```

{{< linked_headline "Flags" >}}

The install script can take flags to help your customers with specialized enterprise setups.

| Flag                          | Usage                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| airgap                        | airgap implies "no proxy" and "skip docker"                                                        |
| bypass-storagedriver-warnings | Bypass the storagedriver warning                                                                   |
| bootstrap-token               | Authentication token used by kubernetes when adding additional nodes                               |
| bootstrap-token-ttl           | TTL of the `bootstrap-token`                                                                       |
| http-proxy                    | If present, then use proxy                                                                         |
| log-level                     | If present, this will be the log level of the Replicated daemon (debug, info, or error).           |
| no-docker                     | Skip docker installation                                                                           |
| no-proxy                      | If present, do not use a proxy                                                                     |
| public-address                | The public IP address                                                                              |
| private-address               | The private IP address                                                                             |
| no-ce-on-ee                   | Disable installation of Docker CE onto platforms it does not support - RHEL, SLES and Oracle Linux |
| storage_provisioner		| Disable automatically provisioning storage for PersistentVolumeClaims on the host				     |
| storage_class			| The name of an alternative StorageClass that will provision storage for PVCs                       |

Example quick install with flags:

```shell
curl -sSL https://get.replicated.com/kubernetes-init \
  | sudo bash -s kubernetes-only bootstrap-token-ttl=0
```

{{< linked_headline "Kubernetes Only In Airgapped Environments ">}}

The airgap package can be installed by downloading the latest release from https://s3.amazonaws.com/replicated-airgap-work/replicated__docker__kubernetes.tar.gz and running the following commands:

```shell
tar xzvf replicated__docker__kubernetes.tar.gz
cat ./kubernetes-init.sh | sudo bash -s airgap kubernetes-only
