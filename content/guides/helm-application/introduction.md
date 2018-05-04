---
date: "2018-05-01T19:00:00Z"
title: "Introduction to Ship"
description: "An introduction to Ship"
weight: "30001"
categories: [ "Ship Guide" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
previousPage: "/"
---

{{< linked_headline "About This Guide" >}}

This guide will walk you through the process of taking an existing Helm application, package it and distribute it in Replicated using [Replicated Ship](/docs/ship). For this guide, we will take the GitLab Helm charts and use them to create an easy-to-deploy application.

{{< linked_headline "Introduction to Replicated Ship" >}}

Replicated Ship is a set of tools (APIs, YAML spec, and distributable components) that make it easy to package and distribute a modern, cloud-native application for an enterprise customer to install, configure, and operate in their own private environment.

Your customer will use the same tools to install and operate your application as your package into the release. One of the main features of Replicated Ship is its ability to package and install software when the operator has no knowledge of the software being installed.

{{< linked_headline "Prerequisites" >}}

Before you can distibute an application on Ship, you must be able to deploy all of the application components using scripts or automation. Ship is compatible with any form of automation, from Kubernetes to custom bash scripts, or popular tools such as Ansible or Chef, or anything else.

The most common use of Replicated Ship is to distribute a Kubernetes (or Helm) application to an enterprise customer, and provides tools for installation-time customization and also to build the installation, update and operation of the application into their enterprise workflow.

{{< linked_headline "Features" >}}

### Customizable Installation/Update Process

When the end customer installs a Ship application, Ship will launch a branded and customizable web-based setup console. It's here that customized [commands](/docs/ship/commands) can generate data such as keys, certs, random strings, etc. The console also shows an interactive form for the operator to input data that's required to start the application.

The web-based console is a nice, user friendly way to set up the application, but automation is a big part of Ship. When an application is distributed on Ship, it's easy for the operator to automate the configuration and update process so any updates can be applied to a change management process and then staged for deployment. This can even be used to create a continuous delivery process for your on-prem software.

### Private Asset Delivery

Most enterprise software includes private assets including Docker images, license data and more. When using Ship, the license key (and installation script) provided to your customer grants them read-only, audited access to these resources for the duration of the license. The entitlement to download these resources can be revoked at any time.

{{< linked_headline "Next Steps" >}}

The next section of this guide will walk you through packaging GitLab Enterprise from a Helm Chart into a Ship Application and then install and operate it on a Kubernetes Cluster. [Continue to the next page](../create-a-release) to get started.