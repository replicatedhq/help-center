---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Instance Reporting"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Replicated Vendor"]
---

Replicated recently introduced a way to track the usage & updates for each customer you issue a
license to (available for customer running Replicated versions 1.2.48 & higher). This is helpful when
you're supporting a customer or what to just have some insight as to how they're using the license
you provided to them.

You can view the number of times a license has been installed by navigating to the
[Customers page in the vendor portal](http://vendor.replicated.com/customers). By clicking on the "Customer reporting" button under Actions you’ll then be able to view the active and inactive instances of
that license.

![Select License](/images/post-screens/select-customer.png)

You can click into a specific instances details by clicking the "View Details" icon. (Instances are
marked as inactive after 24 hours has passed from their last checkin).

![License Instances](/images/post-screens/customer-reporting.png)

On the instance page you’ll find the records for when each update was first applied (specifically when
it first reported back to Replicated that it was applied). You’ll also find the active versions of
the Replicated daemons.

![Instance](/images/post-screens/instance.png)
