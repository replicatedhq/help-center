---
date: "2016-07-03T04:02:20Z"
title: "Shipping With Kubernetes on Replicated"
description: "A quick overview of how to get started with Kubernetes and Replicated."
weight: "301"
categories: [ "Shipping With Kubernetes" ]
index: "docs/kubernetes"
hideFromList: true
---

Replicated is a platform to deploy containerized SaaS applications behind a firewall (ie private cloud, private
data center etc). This guide will walk you through the required steps to start shipping your application using Replicated.

When running Replicated and Kubernetes together, you can reuse most of your existing Kubernetes specs, and Replicated will install and maintain a Kubernetes cluster and your application for your enteprise customer.

## Overview
The process to ship your application in Replicated consists of the following steps:

1. Create a vendor account on the [Replicated Vendor Portal](https://vendor.replicated.com/signup).
1. Prepare the images required by your app. You can either:
    - Tag and push your images to the Replicated Private Registry. Or
    - Select images from a public registry ie Docker Hub. Or
    - Push your images to a third party private registry & provide Replicated with access.
1. Define your components on the Replicated Vendor Portal.
1. Create a release of your application.
1. Install your application to test.