---
date: "2018-05-25T12:00:00Z"
title: "Configure Replicated to Use Studio"
description: "Install Replicated and configure it to use Studio"
weight: "9012"
categories: [ "Replicated Studio Guide" ]
index: "guides/studio"
type: "chapter"
gradient: "redToRed"
icon: "replicatedCircle"
aliases: [/guides/configure-studio]
---

### Install Replicated with Studio configuration on the dev server

Use our simple installation script (on a Linux server in your IaaS provider of choice, or in a local dev environment in Vagrant/VirtualBox) to install Replicated. You'll be prompted for the ngrok hostname provided earlier during setup.

#### Native

```bash
curl -sSL https://get.replicated.com/studio/native | sudo bash
```

#### Swarm

```bash
curl -sSL https://get.replicated.com/studio/swarm  | sudo bash
```

#### Kubernetes

```bash
curl -sSL https://get.replicated.com/studio/k8s | sudo bash
```
