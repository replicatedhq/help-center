---
date: "2016-07-01T00:00:00Z"
lastmod: "2017-03-22T00:00:00Z"
title: "Firewalls"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
---

Often, customers will need to have a complete list of expected internal and outbound network traffic so they can open ports in firewalls and whitelist hosts and IP addresses for outbound connectivity. This document provides the list of all known connections that Replicated requires to run. Any external services required are not listed here.

Note: Airgap installations can run completely offline, and all tasks can be performed without outbound internet access. Additionally, no installations of Replicated ever require inbound access.

Depending on the current activity, the needs can be different. This document is broken into the tasks that the customer is attempting to perform, and then broken down by the type of installation they are running.

For IP based firewalls rules you can get the needed IPs from the [Replicated Services and IPs](https://github.com/replicatedhq/ips/blob/master/ip_addresses.json).

## Port Requirements

To use the Replicated management console you are required to allow inbound/outbound traffic on TCP port `:8800` to the subnet with which an IT administrator would be accessing the console.

For Replicated communication you must also allow TCP ports `:9870-:9880` to accept both inbound/outbound traffic on the installed subnet. These ports are for internal communication and should not be exposed externally. Please note that if you are running a multi-host setup communication on these ports will be required between hosts as well as on the primary host.

## Initial Installation of Replicated
When Replicated is installed, it can be downloaded from the Internet or packaged up and delivered in an airgap pacakge.

| Host | Online Installation | Airgap Installation | Description |
|---|---|---|---|
| get.replicated.com | <i class="fa fa-check" /> Required | <i class="fa fa-times" /> Not Required | This endpoint hosts the install script that used in the Replicated [easy install](/docs/distributing-an-application/installing-via-script) script. |
| quay.io | <i class="fa fa-check" /> Required | <i class="fa fa-times" /> Not Required | The current Replicated images are hosted as public images in the Quay.io registry. |
| Docker Hub | <i class="fa fa-check" /> Required | <i class="fa fa-times" /> Not Required | Some dependencies of Replicated are hosted as public images in Docker Hub.|

## Application Installation and Upgrade

To install your application and perform updates, some external connections are required. All connections are initiated from inside the network, and can vary depending on the installation method and the application update.


| Host | Online Installation | Airgap Installation | Description |
|---|---|---|---|
| api.replicated.com | <i class="fa fa-check" /> Required | <i class="fa fa-times" /> Not Required | This endpoint services the license sync check and used to pull down yaml for app upgrades. |
| registry.replicated.com | <i class="fa fa-check" /> Required | <i class="fa fa-times" /> Not Required | This endpoint services pull requests for all private images. |
| quay.io | <i class="fa fa-check" /> Required | <i class="fa fa-times" /> Not Required | The current Replicated images are hosted as public images in the Quay.io registry and may be upgraded during app upgrade time. |
| Docker Hub | <i class="fa fa-check" /> Required | <i class="fa fa-times" /> Not Required | Some dependencies of Replicated are hosted as public images in Docker Hub.|
| Third Party Registries | <i class="fa fa-check" /> Required | <i class="fa fa-times" /> Not Required | Replicated will pull public images hosted on third party registries directly so those should be identified and white listed. |

## Ongoing Access
When the application is up and running, and not being updated, the requirements for outbound internet access are greatly reduced. It's possible to even run a server completely disconnected from the Internet, and only connect when you want to check for updates.

Once the application is installed, your customer can continue to run it, and stop and start the application without any outbound access.

In order to perform basic maintence, some outbound access is required, as documented in the table below:

| Task | Host | Online Installation | Airgap Installation | Description |
|---|---|---|---|---|
| Check for updates | api.replicated.com (port 443) | <i class="fa fa-check" /> Required | <i class="fa fa-times" /> Not Required | This endpoint is the only endpoint required to check for application updates. |
| License sync | api.replicated.com (port 443) | <i class="fa fa-check" /> Required | <i class="fa fa-times" /> Not Required | This endpoint is the only endpoint required to sync the license. |
