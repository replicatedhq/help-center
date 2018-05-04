---
date: "2018-05-02T01:19:20Z"
title: "Kubernetes and Airgap"
description: "Best practices for creating airgap installations on Kubernetes"
weight: "44002"
categories: [ "Ship Recipes" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Kubernetes and Airgap" >}}

When distributing a Kubernetes (or Helm) application using Replicated Ship, your customer will have a Kubernetes cluster running to deploy to. The term "airgap cluster" refers to any cluster that doesn't have outbound Internet access, and therefore cannot pull your images from a Docker registry.