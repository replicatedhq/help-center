---
date: "2016-07-03T04:02:20Z"
title: "Delivering with Kubernetes on Replicated"
description: "A quick overview of how to get started with Kubernetes and Replicated."
weight: "2501"
categories: [ "Delivering with Kubernetes" ]
index: ["docs/kubernetes", "docs"]
aliases : [docs/kubernetes/getting-started/,/tags/kubernetes/]
gradient: "kubernetes"
hideFromList: true
icon: "replicatedKubernetes"
---

Replicated can be used with a Kubernetes application to deploy an enterprise-installable version of your application. Replicated is a platform that adds functionality to an application to allow for easy behind-the-firewall installation and integration into enterprise systems. When using Replicated with Kubernetes, developers have the ability to reuse most of the existing Kubernetes specs and Replicated will be responsible for installing and maintaining a Kubernetes cluster for the enterprise installation.

## When to use the Kubernetes Scheduler

Compared to other schedulers supported by Replicated, Kubernetes offers:

* Native Kubernetes experience, including the ability to deliver and reuse existing Kubernetes specs
* Automatic provisioning of a Kubernetes cluster on any supported operating system
* Standard Kubernetes functionality including cluster-wide DNS resolution and load balancing

## When to Use Other Schedulers

There are cases where using other schedulers, such as the Replicated Native scheduler or Docker Swarm provides a better experience.

* Some enterprises require the use of Long Term Support Operating Systems in the 2.x kernel series such as RedHat Enterprise Linux 6. Replicated with Kubernetes requires Docker 1.12 or 1.13, RHEL6 only supports Docker 1.7.1. To support RHEL 6 and older versions of Docker, consider the [Replicated Native Scheduler](/docs/native/getting-started).
* If existing Kubernetes specs are not available, writing them only to support an enterprise installation might take extra time. In this case, the learning curve of Docker Swarm could be a good choice.

## Overview
The process to distribute your application in Replicated consists of the following steps:

1. Create a vendor account on the [Replicated Vendor Portal](https://vendor.replicated.com/signup).
1. Prepare the images required by your app. You can either:
    - Tag and push your images to the Replicated Private Registry. Or
    - Select images from a public registry ie Docker Hub. Or
    - Push your images to a third party private registry & provide Replicated with access.
1. Define your components on the Replicated Vendor Portal.
1. Create a release of your application.
1. Install your application to test.
