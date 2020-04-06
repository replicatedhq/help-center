---
date: "2016-07-03T04:02:20Z"
title: "Installing Replicated"
description: "Instructions for installing Replicated via the easy install script, manually or behind a proxy. Also includes instructions for uninstalling Replicated."
keywords: "installing, removing, migrating"
weight: "2702"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
aliases: [docs/distributing-an-application/installing-on-kubernetes]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

We distribute an installation script that can be used to install Docker, Kubernetes and Replicated. The cluster should not be created prior to running the install script. The Replicated install script will install a working Kubernetes cluster.

{{< linked_headline "Basic install (recommended):" >}}

The basic install will install Docker, Kubernetes and Replicated. It will save the install script to a file which you can inspect and then run. We recommend reading and understanding the install script prior to running.

```shell
curl -sSL -o install.sh  https://get.replicated.com/kubernetes-init
sudo bash ./install.sh
```

{{< linked_headline "Quick Install" >}}

The quick Kubernetes install will install Docker, Kubernetes and Replicated. Use this method if you have no need to view/change the installer script and you just want a one-line install.

```shell
curl -sSL https://get.replicated.com/kubernetes-init | sudo bash
```

{{< linked_headline "Flags" >}}

The install script can take flags to help your customers with specialized enterprise setups.

| Flag                             | Usage                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| airgap                           | airgap implies "no proxy" and "skip docker"                                                        |
| bypass-storagedriver-warnings    | Bypass the storagedriver warning                                                                   |
| bootstrap-token                  | Authentication token used by kubernetes when adding additional nodes                               |
| bootstrap-token-ttl              | TTL of the `bootstrap-token`                                                                       |
| disable-contour                  | If present, disables the deployment of the Contour ingress controller                              |
| encrypt-network                  | Disable network encryption with `encrypt-network=0`                                                |
| hard-fail-on-loopback            | If present, aborts the installation if devicemapper on loopback mode is detected                   |
| http-proxy                       | If present, then use proxy                                                                         |
| ip-alloc-range                   | Customize the range of IPs assigned to pods                                                        |
| service-cidr                     | Customize the range of virtual IPs assigned to services                                            |
| log-level                        | If present, this will be the log level of the Replicated daemon (debug, info, or error).           |
| no-docker                        | Skip docker installation                                                                           |
| no-proxy                         | If present, do not use a proxy                                                                     |
| no-clear                         | If present, the terminal will not be cleared after the completion of the installation              |
| public-address                   | The public IP address                                                                              |
| private-address                  | The private IP address                                                                             |
| release-sequence                 | The release of your app to install                                                                 |
| ui-bind-port                     | The port to bind the UI to                                                                         |
| no-ce-on-ee                      | Disable installation of Docker CE onto platforms it does not support - RHEL, SLES and Oracle Linux |
| reset                            | Uninstall Kubernetes                                                                               |
| force-reset                      | If present, suppress all prompts and warning messages before uninstalling Kubernetes               |
| storage-provisioner              | Disable automatically provisioning storage for PersistentVolumeClaims on the host                  |
| storage-class                    | The name of an alternative StorageClass that will provision storage for PVCs                       |
| service-type                     | Enable Service type of LoadBalancer for the Replicated Admin console                               |
| kubernetes-upgrade-patch-version | Upgrade to the latest available patch release of Kubernetes                                        |
| ha | Installs Replicated in ["high availability"](/docs/kubernetes/customer-installations/high-availability/) mode. The script will prompt for a load balancer address if not specified in the `load-balancer-address` flag. |
| load-balancer-address | Installs Replicated in ["high availability"](/docs/kubernetes/customer-installations/high-availability/) mode with the load balancer address specified as the control plane endpoint. |
| unsafe-skip-ca-verification | Disable CA public key verification (kubernetes only) |
| kubernetes-only | Only install Kubernetes - don't install Replicated. See the 'installing Kubernetes only' [page](docs/kubernetes/customer-installations/installing-k8s-only/). |

Example quick install with flags:

```shell
curl -sSL https://get.replicated.com/kubernetes-init | sudo bash -s no-proxy ui-bind-port=8000
```

{{< linked_headline "Compatible Kubernetes Versions" >}}

Every release of Replicated is pinned to a version of Kubernetes, which will be installed by the install script.

| Replicated Version | Kubernetes Version |
| ------------------ | ------------------ |
| < 2.26.0           | 1.9.3              |
| 2.26.0 to 2.30.2   | 1.11.5             |
| 2.31.0 to 2.37.1   | 1.13.5             |
| >= 2.38.0          | 1.15.3             |

Replicated 2.26.0 to 2.30.2 were pinned to Kubernetes 1.11.1 when released but were updated on December 7, 2018 to 1.11.5.
Replicated 2.31.0 to 2.34.1 were pinned to Kubernetes 1.13.0 when released, and airgap bundles from 2.31.0 to 2.34.1 include 1.13.0.
Replicated 2.38.0 was pinned to Kubernetes 1.15.0 when released and the 2.38.0 airgap bundle includes 1.15.0.
Re-running the `kubernetes-init` install script will not update patch versions by default, but the upgrade can be forced by passing the `kubernetes-upgrade-patch-version` flag to the script.

{{< linked_headline "Upgrading" >}}

Please refer to our docs on upgrading [here](../upgrading)

{{< linked_headline "High Availability" >}}

Replicated Embedded Kubernetes has the ability to run in highly available mode with multiple Kubernetes master control plane nodes. The addition of the `ha` flag when running the Kubernetes easy-install script signals to Replicated that this cluster should be run in HA mode. For more information please refer to our docs on high availability clusters [here](../high-availability).

```shell
curl -sSL -o install.sh  https://get.replicated.com/kubernetes-init
sudo bash ./install.sh ha
```

{{< linked_headline "Uninstalling" >}}

Use the `reset` flag to uninstall Kubernetes and Replicated.  Please note that this flag is not recommended to be used on production systems.

```shell
curl -sSL https://get.replicated.com/kubernetes-init | sudo bash -s reset
```

The procedure described in [this post](https://help.replicated.com/community/t/uninstall-a-kubernetes-replicated-application/295) can be used to reset Replicated back to the state where license can be uploaded again without removing Kubernetes.  This is a safer option.
