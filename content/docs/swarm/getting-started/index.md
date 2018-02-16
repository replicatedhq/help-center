---
date: "2016-07-03T04:02:20Z"
title: "Getting Started With Docker Swarm"
description: "A quick overview of how to get started with the Replicated Docker Swarm scheduler."
weight: "101"
categories: [ "Docker Swarm" ]
tags: [ "Replicated Vendor" ]
index: "docs/native"
hideFromList: true
---

The Replicated platform can be used in conjunction with Docker Swarm to deploy containerized SaaS applications behind a firewall. Replicated provides developers with the ability to support their applications, allow users to configure it for their enterprise environment, and offer their SaaS application as an appliance. Using the Docker Swarm scheduler offers application developers fault tolerance, distribution, secrets management, and more.

## When to Use the Docker Swarm Scheduler

In most cases, Replicated recommends using the Docker Swarm scheduler. Compared to other schedulers, it offers:

* Single daemon provisioining and scaling, while offering multiple node distribution and overlay networking. In contrast, the Kubernetes scheduler requires other tooling to provision a cluster.
* Docker Compose release format, allowing developers to more closely mirror Replicated releases to development and SaaS environments
* Built-in overlay networking that can more transparently integrate with customer environments
* Cluster-wide service load balancing

## When to Use Other Schedulers

There are a few cases where using other schedulers, such as the Replicated Native scheduler or Kubernetes scheduler, provide a better experience.

* Some enterprises require the use of Long Term Support Operating Systems in the 2.x kernel series such as Red Hat Enterprise Linux 6. Replicated supports Docker Swarm to version 1.9.x, whereas RHEL6 only supports Docker 1.7.1. Enterprise software can still be delivered via the [/native/getting-started](Replicated Native Scheduler).
* Docker Swarm does not provide cron job or task-based workloads without the use of other workloads. For applications built in software like Rails, tools like Resque and Sidekiq sidestep this need, while others can benefit from using the [#](Kubernetes Scheduler).

## Shipping on Docker Swarm

The process to ship your application in Replicated consists of the following steps:

1. Create a vendor account on the [Replicated Vendor Portal](https://vendor.replicated.com/signup).
1. Prepare the images required by your app. You can either:
   * Tag and push your images to the Replicated Private Registry. Or
   * Select images from a public registry ie Docker Hub. Or
   * Push your images to a third party private registry & provide Replicated with access.
1. Define your components on the Replicated Vendor Portal.
1. Create a release of your application.
1. Install your application to test.

The [/docs/swarm/packaging-an-applicaiton/docker-swarm/](Packaging an Application) section describes the release YAML format for Docker Swarm in more detail.
