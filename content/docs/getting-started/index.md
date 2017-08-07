---
date: "2016-07-03T04:02:20Z"
title: "Getting Started"
description: "A quick overview of how to get started with the Replicated platform."
weight: "101"
type: "section"
categories: [ "Getting Started" ]
hideSection: true
index: "docs"
---

Replicated is a platform to deploy containerized SaaS applications behind a firewall (ie private cloud, private
data center etc). This guide will walk you through the required steps to start shipping your application using Replicated.

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