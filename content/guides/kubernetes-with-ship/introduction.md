---
date: "2018-05-01T19:00:00Z"
title: "Introduction to Ship"
description: "An introduction to Ship"
weight: "30101"
categories: [ "Get Started with Ship" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
previousPage: "/"
---

{{< linked_headline "About This Guide" >}}

This guide will walk you through the process of taking an existing Kubernetes application and packaging it so it can be distributed and managed with [Replicated Ship](https://www.replicated.com/ship). For this guide, we will package and deliver a simple nginx application on Kubernetes. While this is a trivial example, Ship is designed to support large complex applications and has native support for [Helm charts](https://helm.sh) and [Kustomize](https://kustomize.io).

### Looking for Ship Open Source?

This guide is for application vendors looking to enable your end customers to manage a [proprietary](#features-for-app-maintainers) application with Ship. If you are looking for an easier way to distribute or manage publicly available Kubernetes- or Helm-based applications, you may want to check out [Ship for Open Source](https://www.replicated.com/ship/oss).


{{< linked_headline "Introduction to Replicated Ship" >}}

Replicated Ship is a set of tools (APIs, YAML spec, and distributable components) that make it easy to package and distribute a modern, cloud-native application for an enterprise customer to install, configure, and operate in their own private environment.

Your customer will use Ship to install and operate your application, and you can use Ship to test your release as your develop it. One of the main goals of Replicated Ship is to package and deliver applications when the operator is unfamiliar with the software being installed.

{{< linked_headline "Prerequisites" >}}

Before you can distibute an application on Ship, you must be able to deploy all of the application components using scripts or automation. Ship's design allows it to be compatible with any automation tooling, including but not limited to

- Kubernetes
- Configuration Management tools like Chef and Ansible
- Infrastructure as Code tools like Terraform and Cloudformation
- Python, Ruby, or Bash scripts

The most common use of Replicated Ship is distributing a Kubernetes (or Helm) application to an enterprise customer. Ship provides tools for installation-time customization as well as primitives for operationalizing the application in an automation-driven enterprise workflow.

{{< linked_headline "Features for App Distributors" >}}

### Customizable Installation/Update Process

When the end customer installs a Ship application, Ship will launch a branded and customizable web-based setup console. It's here that customized [config options](/docs/ship/config/overview) can generate data such as keys, certs, random strings, etc. The console also shows an interactive form for the operator to input data that's required to start the application.

### Focus on "Day 2" Operations

The web-based console is a nice, user friendly way to set up the application, but automation is a big part of Ship. When an application is distributed on Ship, it's easy for the operator to automate the configuration and update process so any updates can be applied to a change management process and then staged for deployment. This can even be used to create a continuous delivery process for your on-prem software.

### Release Channels

Application Vendors can iterate continuously by publishing releases to the Replicated 'Unstable' Channel multiple times per day, test release candidates by promoting to 'Beta' and finally release to customers via the 'Stable' channel when a release has been vetted and is ready for customers. End customers will be licensed against one or more channels, and additional custom channels can be created, giving your team flexibility in how and when you roll out to your users.

### Private Asset Delivery

Most enterprise software includes private assets including Docker images, license data and more. When using Ship, the license key (and installation script) provided to your customer grants them read-only, audited access to these resources for the duration of the license. The license/entitlement to download these resources can be revoked at any time.

### Tooling for Supportability

Deploying to customers environments will always be more challenging than deploying to servers that your team has direct access to. However, Ship applications can be distributed with [Replicated Troubleshoot](/guides/troubleshoot/) to collect environment and application specific information from the customer's private instance. Custom analyzers and collectors empower support teams to solve common problems quickly without engaging the DevOps/engineering team to solve every on-prem customer problem.

### Advanced features

Our strong focus on solving the problems surrounding 3rd-party application delivery and maintenance for some of the best enterprise software companies in the world gives us Replicated a unique position to [continuously introduce industry leading features](../explore-features/).

{{< linked_headline "Next Steps" >}}

The next section of this guide will walk you through packaging a sample nginx stack into a Ship Application and then install and operate it on a Kubernetes Cluster. [Continue to the next page](../create-a-release) to get started.
