---
date: "2016-07-03T04:02:20Z"
title: "Replicated Native Scheduler"
description: "A quick overview of how to get started with the Replicated native scheduler."
weight: "100"
categories: [ "Replicated Scheduler" ]
index: ["docs/native", "docs"]
aliases: [/docs, /docs/native/getting-started, /docs/getting-started/get-started/,/docs/native]
hideFromList: true
icon: "replicatedCircle"
---

{{<legacynotice name="native">}}

{{< linked_headline "About the Replicated Native Scheduler" >}}

The Replicated Native Scheduler is a mature, proprietary runtime that's being used to manage single and multi-node clusters in many Replicated installations today.

{{< linked_headline "Strengths of the Replicated Native Scheduler" >}}

There are several factors to consider when deciding which scheduler to deliver your enterprise installable application with, including:

- Compatibility with hosted scheduler specs, if any
- Knowledge and experience running and supporting the scheduler
- Support for your end-customers environment
- Features of the scheduler

The Replicated Native Scheduler focuses on the broadest possible support for end-customer environments by including support for Docker {{< docker_version_minimum >}}.

{{< linked_headline "Tradeoffs with the Replicated Native Scheduler" >}}

The Replicated Native Scheduler does not support DNS based service discovery and overlay networks. All container communication can occur over the host networking stack for multi-node clusters, or over the docker0 network for single node clusters.

The Replicated Native Scheduler does not support zero downtime updates. When an update is available, the containers are stopped and restarted to apply the update. Many enterprise customers will schedule a maintenance window to update on-prem applications.

The Replicated Native Scheduler is a different orchestration manifest than you run in production. If you've invested in Kubernetes, Swarm or other schedulers for your hosted product, you'll have to rewrite some manifests to support your enterprise customers.
