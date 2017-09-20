---
date: "2017-06-29T00:00:00Z"
lastmod: "2017-06-29T00:00:00Z"
title: "Docker Enterprise Edition and Replicated on RHEL"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Docker"]
---

This document describes the general process of installing Docker Enterprise Edition (EE) and Replicated onto a RedHat Enterprise Linux (RHEL) server.

## Step 1: Install Docker Enterprise Edition onto RHEL

For RHEL servers you will need to install Docker EE. This will require that you have a paid Docker EE license or a 30-day trial license. Follow the [Installing Docker EE on RHEL](https://docs.docker.com/engine/installation/linux/docker-ee/rhel/) document and ensure you have a running Docker EE service before continuing to the next section.

## Step 2: Configure DeviceMapper + direct-lvm
RedHat recommends a non-default storage driver for production environments. Follow the [Configure direct-lvm mode for production](https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#configure-direct-lvm-mode-for-production) documentation to place your Docker engine into DeviceMapper direct-lvm mode.


## Step 3: Install Replicated on RHEL

Once you have your RHEL server running Docker EE you will want to install Replicated using the `no-docker` flag.

For example, installing Replicated into a Docker EE/RHEL using the easy install method you will run the following command:

```
curl -sSL https://get.replicated.com/docker | sudo bash -s no-docker
```
