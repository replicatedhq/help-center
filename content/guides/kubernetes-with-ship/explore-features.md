---
date: "2018-05-01T19:00:00Z"
title: "Explore Features"
description: "Deep dives on various Ship features, including docker image management, support bundles, and Terraform support."
weight: "30111"
categories: [ "Get Started with Ship" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

Congratulations, you're set up to iterate on your Ship application. By now you've hopefully got a good grasp on the basics of using ship, and its time to dig into the features that Ship exposes for packaging your application. 

The goal of this chapter is to help you transition into using the [Technical Deep Dives](/docs/ship) and [Reference Docs](/api/ship-yaml) as you expand your starter project into a production-ready Ship application. Topics covered are:

- [Docker Image Management and Airgap](#docker-image-management-and-airgap)
- [Deliver end-to-end Infrastructure with Terraform](#deliver-end-to-end-infrastructure-with-terraform)
- [Support and Troubleshoot your Appliation](#support-and-troubleshoot-your-application)
- [Features for Cluster Operators](#features-for-cluster-operators)
- [Explore Reference Docs](#explore-reference-docs)

{{< linked_headline "Docker Image Management and Airgap" >}}

Learn about how to pull images from the Replicated Private Registry, and bundle image archives for deployment into airgapped clusters. 

- [Docker Assets](/docs/ship/assets/docker/) 
- [Delivering an on-prem docker registry with your application](/docs/ship/playbooks/registry-kubernetes/).

{{< linked_headline "Deliver end-to-end Infrastructure with Terraform" >}}

Learn about how to allow end customers to opt-in to a more black-box appliance experience by bundling [Terraform](https://terraform.io) manifests and having Ship manage infrastructure provisioning and state. Distribute a hands-off, managed instance of your application into a private cloud with the same workflow and manifests you use for delivering into opinionated, existing cluster environments.

- [Using Integrated Terraform](/api/ship-lifecycle/terraform/)
- [Using Integrated Kubectl](/api/ship-lifecycle/kubectlapply/)
- [Ship Starter Repo (Terraform Branch)](https://github.com/replicatedhq/replicated-starter-ship/tree/terraform) 

{{< linked_headline "Support and Troubleshoot your Application" >}}

One of the biggest challenges when distributing on-prem software is troubleshooting applications on infrastructure you don't control. Replicated knows this problem well, and we've built powerful general-purpose tools for collecting and analyzing information from on-prem instances of your application.

- [Intro to Troubleshoot and Support Bundles](/guides/troubleshoot/)
- [Bundling Troubleshoot with your Ship Application](/docs/ship/playbooks/support-kubernetes/)

{{< linked_headline "Features for Cluster Operators" >}}

This guide focuses on application distributors, but there are a lot of Ship features that make it a great solution for cluster operators too. A primary goal of Ship is to allow Cluster Operators to deliver 3rd party applications to their cluster the same way they manage their internal owned and written applications. Ship facilitates rollouts via existing automation systems with deep Kustomize integration, primitives like `ship watch` and `ship update`. Ship Cloud allows for a zero-ops solution to ensuring third party software is up to date 

- [Ship For Cluster Operators](https://www.replicated.com/ship)
- [Ship Cloud/Ship Hosted](https://www.replicated.com/watches)
- [Ship OSS](https://www.replicated.com/ship/oss)
- [Ship OSS -- How it works](https://www.replicated.com/ship/how-it-works)
- [Migrating Existing Deployments to Ship with "Unfork"](https://www.replicated.com/watch/create/unfork)

{{< linked_headline "Explore Reference Docs" >}}

The generated reference documentation is a good resource for exploring all possible inputs for each Ship YAML section.

- [Assets](/api/ship-assets/assets) 
- [Config](/api/ship-config/config) 
- [Lifecycle](/api/ship-lifecycle/lifecycle)

