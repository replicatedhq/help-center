---
date: "2016-07-03T04:02:20Z"
title: "Security"
description: "A description of the security policies included in the Replicated Private Registry"
weight: "1303"
categories: [ "Private Registry" ]
index: "docs/registry"
aliases: [/docs/packaging-an-application/commands/,/docs/swarm/packaging-an-application/commands/]
---

{{< linked_headline "Replicated Private Registry Security" >}}

This document lists the security measures and processes in place to ensure that images pushed to the Replicated Private Registry remain private.

{{< linked_headline "Single Tenant Isolation" >}}

The registry is deployed and managed as a multi-tenant application, but each tenant is completely isolated from data created and pulled by other tenants. Docker images have shared base layers, but the Replicated Private Registry doesn't share these between tenants. For example, if a tenant created an image `FROM postgres:10.3`, and pushed the image to Replicated, all layers will be uploaded, even if other tenants have this base layer uploaded.


{{< linked_headline "Authentication and Authorization" >}}

The Replicated Private Registry supports several method of authentication. Note that public authentication is never allowedl the registry only accepts authenticated requests. 

### Vendor Authentication

All accounts with Read/Write access on vendor.replicated.com or console.replicated.com will have full access to the registry. These users can push and pull images to and from the registry. 

### End Customer Authentication

A valid (unexpired) license file has an embedded `registry_token` value. Replicated components shipped to customers will use this value to authenticate to the registry. When authenticating using a `registry_token`, only pull access is enabled. A `registry_token` has pull access to all images in the tenants account. When a license expires (or the expiration date is changed to a past date), all future authentication (and therefore pull requests) will be denied.

{{< linked_headline "Networking and Infrastructure" >}}

A dedicated cluster is used to run the Replicated Private Registry. The servers running the registry aren't used for any services other than what's required to run the registry. 

The registry metadata is stored in a shared database instance. This contains information about each layer in an image, but not the image data itself.

The registry image data is securely stored in an encrypted S3 bucket. Each tenant has a unique directory in the shared bucket and access is limited to the team or license making the request.

{{< linked_headline "Runtime Monitoring" >}}

Replicated uses a Web Application Firewall (WAF) on the cluster that monitors and will block any unusual activity. When unusual activity is detected, access from that endpoint will be automatically blocked for a period of time, and the Replicated SRE is alerted.

{{< linked_headline "Penetration Testing" >}}

Replicated has completed a formal pen test that included the Private Registry in the scope of the test. Replicated also continues to run a bug bounty program and encourages responsible disclosure on any vulnerabilities found.