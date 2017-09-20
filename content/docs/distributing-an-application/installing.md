---
date: "2016-07-03T04:02:20Z"
title: "Installing Replicated"
description: "Instructions for installing Replicated via the easy install script, manually or behind a proxy. Also includes instructions for uninstalling Replicated."
keywords: "installing, removing, migrating"
weight: "302"
categories: [ "Distributing an Application" ]
index: "docs"
tags: ["Installing Replicated"]
---

{{< note title="Replicated 2.0" >}}
The content in this document is specific to Replicated 2.0. If you are looking for the Replicated 1.2 version of this document, it is available at <a href="/docs/distributing-an-application/installing-1.2/">{{< baseurl >}}distributing-an-application/installing-1.2/</a>
{{< /note >}}

## Prerequisites
Before installing Replicated review the list of
[supported operating systems](/docs/distributing-an-application/supported-operating-systems/).

## Replicated Version
The current release of Replicated is version {{< replicated_latest_version >}} released on {{< replicated_latest_release_date >}}.  Prior versions are available and can also be installed and instructions how depend on your install method. To read about the latest features of Replicated see the [Replicated changelog](https://release-notes.replicated.com).

### TL;DR

```shell
curl -sSL -o install.sh https://get.replicated.com/docker
sudo bash ./install.sh
```

## Pick your Install Method

### Easy Installation
We provide an easy-to-use one-line installation process (via shell script) which will detect your OS, ask a few questions and install the Replicated.  Included in the install will be init scripts, configuration files and as needed the Docker Engine.

[Continue with the easy install script](/docs/distributing-an-application/installing-via-script)
### Manual Install
We provide a short set of steps to install Replicated manually, for situations where a customer is unable to run the easy install script or you need to install Replicated on an operating system not yet covered by the easy install.  The manual install giving you full control over the install process.

[Continue with a manual install](/docs/distributing-an-application/installing-manually/)

### Airgapped Install
Some installations may not have outbound Internet access.  Replicated provides you the option to do airgapped installs to support those customers.  To install, your customer will download Replicated, your license and the airgap installation file containing your application.

[Continue with an airgapped install](/docs/distributing-an-application/airgapped-installations)

### Kubernetes Install
{{< version version="2.6.0" >}} Replicated can be installed to a Kubernetes cluster. This requires a provisioned Kubernetes cluster and the application release to be installed must include Kubernetes YAML.

[Continue with a Kubernetes install](/docs/distributing-an-application/installing-on-kubernetes)

### Docker Swarm Install
{{< version version="2.7.0" >}} Replicated can be installed with a Swarm cluster. This doesn't require any additional setup, but the application YAML must be written as Swarm services and the machines must be capable of running Docker 1.13.1 or newer.

[Continue with a Swarm install](/docs/distributing-an-application/installing-with-swarm)
