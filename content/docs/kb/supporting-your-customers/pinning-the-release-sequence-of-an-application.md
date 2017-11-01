---
date: "2017-11-01T00:00:00Z"
lastmod: "2017-11-01T00:00:00Z"
title: "Pinning the Release Sequence of an Application"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
---

It is possible to pin the release sequence of a vendor application at install time by setting the `ReleaseSequence` property in the file `/etc/replicated.conf` to the numerical identifier of the release of the vendor application. This sequence number must be from a release that has been promoted to the channel to which the license is set.

This file can be added before Replicated has been installed to pin at install time. It is also possible to add or edit this file in the situation where Replicated is already running. In this case Replicated must be restarted for the changes to take effect. It is not possible to downgrade the vendor application using this method.
