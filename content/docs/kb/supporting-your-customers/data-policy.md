---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Replicated Data Policy"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
kb-sections: ["Delivering Replicated"]
---

A Replicated installation connects to a Replicated-hosted endpoint periodically to
perform various tasks including checking for updates and syncing the installed
license properties. During this time, some data is transmitted from an installed
instance to the Replicated API. This data is limited to:

- The IP address of the primary Replicated instance.
- The ID of the installation.
- The state of the installation (running, stopped, etc).
- The current version of the installation.
- The current version of the Replicated components.

This data is required to provide the expected update and license services. No additional
data is collected and transmitted by default from the instance to external servers.

