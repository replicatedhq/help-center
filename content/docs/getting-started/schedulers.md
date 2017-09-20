---
date: "2017-04-11T00:00:00Z"
title: "Choosing a Scheduler"
description: "Schedulers"
weight: "104"
categories: [ "Getting Started" ]
tags: [ "Replicated Vendor", "Schedulers" ]
index: "docs"
---

Your application is deployed in Docker containers, and likely needs a scheduler to orchestrate and manage the runtime of your containers. Replicated offers several options when integrating, and it's important to understand how each scheduler works with Replicated. Simply stated, the scheduler you choose is the technology you'll have to learn to orchestrate and start your containers. But there are some small differences in how each is run in a customer environment.

{{< linked_headline "Replicated Scheduler" >}}

The Replicated scheduler is a mature container orchestration runtime that supports Docker 1.7.1 and newer. It's actively deployed in many large enterprises and supports all of the features of Replicated. If supporting Docker versions older than 1.13.1 or supporting a one-line installation option is important, the Replicated scheduler is the best choice.

{{< linked_headline "Docker Swarm" >}}

The Docker Swarm scheduler is a great choice if you have existing docker-compose yaml and want to target servers capable of running Docker 1.13.1 or newer. Using the Swarm scheduler, you can use all of the Swarm functionality including overlay networks, DNS service discovery, Docker secrets and more.

{{< linked_headline "Kubernetes" >}}

Kubernetes is a powerful and popular container orchestration and runtime that's quickly gaining popularity. Replicated supports deploying Kubernetes resources to a Kubernetes cluster, if your customer supplies and manages a cluster. If you have existing Kubernetes specs written and your customer is able to supply a Kubernetes cluster to run your application, this is a good choice to use with Replicated.