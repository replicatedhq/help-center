---
date: "2016-07-03T04:02:20Z"
title: "Replicated and Docker Swarm"
description: "A quick overview of how to get started with the Replicated Docker Swarm scheduler."
weight: "500"
categories: [ "Distribute a Swarm Application" ]
index: ["docs/swarm", "docs"]
aliases: [docs/swarm/getting-started/]
gradient: "swarm"
icon: "replicatedDockerSwarm"
hideFromList: true
---

{{<legacynotice>}}

Replicated can be used with a Docker Swarm application to deploy an enterprise-installable version of your application. Replicated provides developers with the ability to support their applications, allow users to configure it for their enterprise environment, and offer their application as an appliance. When using Docker Swarm with Replicated, developers continue to get all of the functionality of the Replicated platform while having access to all of the Docker Swarm functionality.

## When to Use the Docker Swarm Scheduler

Compared to other schedulers supported by Replicated, Docker Swarm offers:

* Single daemon provisioining and scaling, while offering multiple node distribution and overlay networking.
* Docker Compose release format, allowing developers to more closely mirror Replicated releases to development and SaaS environments
* Built-in overlay networking and DNS-based service discovery
* Cluster-wide service load balancing

## Distribute a Swarm Application

The process to distribute your Swarm application in Replicated consists of the following steps:

1. Create a new team on the [Replicated Vendor Portal](https://vendor.replicated.com/signup).
1. Prepare the images required by your app. You can either:
   * Tag and push your images to the Replicated Private Registry. Or
   * Select images from a public registry ie Docker Hub. Or
   * Push your images to a third party private registry & provide Replicated with access.
1. Define your components on the Replicated Vendor Portal.
1. Create a release of your application.
1. Install your application to test.

The [next section](/docs/swarm/packaging-an-application/) describes the release YAML format for Docker Swarm in more detail.
