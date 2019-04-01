---
date: "2018-07-24T08:00:00Z"
title: "Security"
description: "Security is essential to enterprise software. This page describes some of the measures we employ to protect our users' production environments."
keywords: "security, cve, vulnerabilities, policy"
weight: "2714"
categories: [ "Managing Customer Installation" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{< linked_headline "Replicated Data Transmission Policy" >}}

A Replicated installation connects to a Replicated-hosted endpoint periodically to perform various tasks including checking for updates and syncing the installed license properties. During this time, some data is transmitted from an installed instance to the Replicated API. This data is limited to:

- The IP address of the primary Replicated instance.
- The ID of the installation.
- The state of the installation (running, stopped, etc).
- The current version of the installation.
- The current version of the Replicated components.

This data is required to provide the expected update and license services. No additional data is collected and transmitted by default from the instance to external servers.

{{< linked_headline "Domains Required by Replicated" >}}

Below is a list of domains that Replicated On-Prem will communicate with in non-airgap mode. All connections are made over TLS.

- get.replicated.com
- api.replicated.com
- registry.replicated.com
- registry-data.replicated.com
- quay.io

The following is a link to a repository hosting the IPs for all domains that Replicated controls.

https://github.com/replicatedhq/ips

{{< linked_headline "Common Vulnerabilities and Exposures Policy" >}}

It is our policy to maintain container images free of all fixed operating system vulnerabilities (CVEs) for all images that we package along with the Replicated product. This does not include the images distributed by the Vendor that comprise the Vendor’s application, and it will be up to the Vendor to maintain these images. We ensure that any release of the product is free of vulnerabilities at the time of that release, and do not backport these vulnerability patches to prior releases. We recommend that all Replicated installations are updated at the time of each release to stay up-to-date with the most current vulnerability patches. You can subscribe to Replicated release notifications at https://release-notes.replicated.com/release-notes/.

We maintain a list of patched CVEs for each release of Replicated. It is not our policy to make this list public. We will provide this list to our vendors upon request. Please email us at support@replicated.com for more information.

{{< linked_headline "Passwords" >}}

All passwords persisted by Replicated are stored as bcrypt hashes with a cost parameter of 10, with the exception of [configuration item](/docs/config-screen/config-yaml/) passwords which must be stored in a reversible manner. In this case, Replicated uses AES-GCM encryption with a per-installation 192-bit encryption key generated at install time. This encryption key is stored solely on the disk of the system on which it was generated.
