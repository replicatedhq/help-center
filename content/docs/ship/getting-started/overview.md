---
date: "2018-03-03T04:02:20Z"
title: "Shipping with Replicated Ship"
description: "A quick overview of how to get started with Replicated Ship."
weight: "40002"
categories: [ "Shipping with Ship" ]
index: ["docs/ship", "docs"]
aliases: [ /docs/ship/, /docs/ship/getting-started ]
gradient: "console"
hideFromList: true
icon: "replicatedShip"
---

Replicated Ship is a modern, composable way to define and package any application so that it can be configured, installed, updated and operated by someone with limited knowledge of how the software works.  Vendors can distribute proprietary applications with Replicated Ship, for simple and flexible deployment to a variety of destinations, including existing Kubernetes clusters.

## When to use Replicated Ship

Replicated Ship is ideal for delivering to customers with highly automated internal IT infrastructure.  Replicated Ship offers:

* Flexible deployments into pre-existing Kubernetes clusters which are already running other third-party or custom applications
* GitOps workflows, where updates to Replicated Ship applications arrive as pull requests into customers' code repositories

## When to use the Replicated Platform

The Replicated Platform is a better fit for distributing to customers that don't yet have Kubernetes expertise, and prefer to deploy third party software as virtual appliances on dedicated virtual or physical hosts.

## Overview

Once an application has been packaged for deployment with Replicated Ship, customers can deploy instances of the application via the Ship Command Line OSS tool, or the Replicated Ship Cloud service.  Ship also handles Helm Charts and plain Kubernetes yaml, and can be a complete solution for organizations that wish to integrate third party software into their CI/CD systems, for pull-request-driven deployments.

The process to ship your application in Replicated consists of the following steps:

1. Create a vendor account on the [Replicated Vendor Portal](https://vendor.replicated.com/signup).
1. Prepare the images required by your app. You can either:
    - Tag and push your images to the Replicated Private Registry. Or
    - Select images from a public registry ie Docker Hub. Or
    - Push your images to a third party private registry & provide Replicated with access.
1. Create your application on the Replicated Vendor Portal.  Choose "Kubernetes + Replicated" when asked "How do you want to package your application" on the first page, then choose "Kubernetes + Replicated Ship" on the next page.
1. Create a release of your application.
1. Install your application to test.

If you haven't already reviewed our [Delivering a Kubernetes Application with Replicated Ship](/guides/kubernetes-with-ship/) guide, you should read that before proceeding any further.