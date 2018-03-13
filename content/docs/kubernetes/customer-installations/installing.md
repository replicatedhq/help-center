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
| release-sequence              | The release of your app to install

| kubernetes-namespace          | The namespace to install Replicated into                                                           |
| ui-bind-port                  | The port to bind the UI to                                                                         |
| no-ce-on-ee                   | Disable installation of Docker CE onto platforms it does not support - RHEL, SLES and Oracle Linux |

Example quick install with flags:

```shell
curl -sSL https://get.replicated.com/kubernetes-init | sudo bash -s no-proxy ui-bind-port=8000
```

