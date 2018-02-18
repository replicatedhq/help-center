---
date: "2016-07-03T04:02:20Z"
title: "Getting Started With The Replicated Scheduler"
description: "A quick overview of how to get started with the Replicated native scheduler."
weight: "101"
categories: [ "Replicated Scheduler" ]
tags: [ "Replicated Vendor" ]
index: "docs/native"
hideFromList: true
---

Replicated is a platform to package and distribute an application for private installations. These docs will walk you through the required steps to package, distribute and support your application on the Replicated Native Scheduler.

## When to use the Replicated Native Scheduler
The Replicated Native scheduler is a good container orchestration choice for enterprise installations when you need to support older, legacy operating systems. This scheduler supports Docker 1.7.1, which is the latest version of Docker supported on RedHat Enterprise Linux 6, CentOS 6 and other Linux distributions still using the 2.x kernel.

The Replicated scheduler is a propietary, mature container scheduler that supports the features required by enterprise customers. It was designed and built to enable your customer to install a complex application on one or a cluster of servers, without having to install anything else. A customer can bring Linux servers that are compatible with Docker 1.7.1 or newer, and can deploy and manage your application on their servers. This scheduler supports [airgap installations](/docs/native/distributing-an-application/airgapped-installations) and many other features that enterprise users need.

## When to use other schedulers

If your application is already packaged in Kubernetes or Docker Swarm, and you can require LTS versions of operating systems such as RHEL 7, CentOS 7 and others that support current versions of Docker, you should consider shipping using [Replicated and Docker Swarm](/docs/swarm/getting-started) or [Replicated and Kubernetes](/docs/kubernetes/getting-started).

## Overview
The process to ship your application in Replicated consists of the following steps:

1. Create a vendor account on the [Replicated Vendor Portal](https://vendor.replicated.com/signup).
1. Prepare the images required by your app. You can either:
    - Tag and push your images to the Replicated Private Registry. Or
    - Select images from a public registry ie Docker Hub. Or
    - Push your images to a third party private registry & provide Replicated with access.
1. Create a YAML manifest to describe how to orchestrate and start your application containers.
1. Create a release of your application.
1. Install your application to test.