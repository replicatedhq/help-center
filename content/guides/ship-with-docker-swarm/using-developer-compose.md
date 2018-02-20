---
date: "2018-01-30T04:02:20Z"
title: "Using a Developer Compose"
description: "A guide to using a development environment docker-compose as a starting point to shipping with Replicated and Docker Swarm"
weight: "8002"
categories: [ "Docker Swarm Guide" ]
index: "guides/swarm"
type: "guide"
gradient: "orangeToOrange"
---

{{< linked_headline "Starting With A Development docker-compose.yml" >}}

Many development teams have a `docker-compose.yml` to create a development environment. This often isn't far off from what a Swarm Services stack looks like, and can be easily modified to take advantage of the existing manifests.

