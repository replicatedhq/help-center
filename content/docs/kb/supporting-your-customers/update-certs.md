---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Updating SSL/TLS Certificates for On-Prem Admin"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Replicated UI"]
---

Each Replicated installation requires customers to either use a locally generated 
self-signed TLS/SSL cert or provide their own certs during setup.

![Secure The Console](/images/post-screens/secure-the-console.png)

If after initial setup this needs to be changed, it can be done so from the command 
line by using the 
[SSL cert set CLI command](/api/replicated-cli/#certificate-configuration-via-cli) 
or via the UI at https://:8800/console/settings

![Console Settings)(/images/post-screens/console-settings-v1.png)

