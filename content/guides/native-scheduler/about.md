---
date: "2018-01-30T04:02:20Z"
title: "About the Replicated Scheduler"
description: "Discover the basics of the Replicated Native Scheduler"
weight: "9001"
categories: [ "Replicated Scheduler Guide" ]
index: "guides/native"
type: "guide"
gradient: "redToRed"
aliases: [/guides/getting-started]
---

{{< linked_headline "About the Replicated Native Scheduler" >}}

The Replicated Native Scheduler it a mature, propietary runtime that's being used to manage single and multi-node clusters in many Replicated installations today.

{{< linked_headline "Strengths of the Replicated Native Scheduler" >}}

There are several factors to consider when deciding which scheduler to ship your enterprise installable application with, including:

- Compatibility with hosted scheduler specs, if any
- Knowledge and experience running and supporting the scheduler
- Support for your end-customers environment
- Features of the scheduler

The Replicated Native Scheduler focuses on the broadest possible support for end-customer environments by including support for Docker 1.7.1, which includes support back to RedHat Enteprise Linux 6.x and CentOS 6.x. Modern container orchestraters such as Kubernetes and Docker Swarm require a newer kernel and more updated version of Docker than is available for these operating systems. In short, if your end customer requires that you support RHEL 6 or the 2.x Linux kernel, then the Replicated Native Scheduler is the best platform to ship a modern, enterprise installable version of your application.

{{< linked_headline "Tradeoffs with the Replicated Native Scheduler" >}}

The Replicated Native Scheduler does not support DNS based service discovery and overlay networks. All container communication can occur over the host networking stack for multi-node clusters, or over the docker0 interface for single node clusters.

The Replicated Native Scheduler does not support zero downtime updates. When an update is available, the containers are stopped and restarted to apply the update. Many enterprise customers will schedule a maintenance window to update on-prem applications.

The Replicated Native Scheduler is a different orchestration manifest than you run in production. If you've invested in Kubernetes, Swarm or other schedulers for your hosted product, you'll have to rewrite some manifests to support your enterprise customers.