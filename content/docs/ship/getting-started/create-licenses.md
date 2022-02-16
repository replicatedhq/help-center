---
date: "2018-03-03T04:02:20Z"
title: "Create Customers & Licenses"
description: "Details on the options available to vendors when creating a license for an end customer's upcoming installation."
weight: "40008"
categories: [ "Ship" ]
index: ["docs/ship", "docs"]
gradient: "console"
icon: "replicatedShip"
---

{{<legacynotice>}}

Each customer you deploy to via Replicated will need a separate license file for their installation. This license file identifies the customer & application during the installation and update processes. A customer license is created in the Customers section of the [vendor portal](https://vendor.replicated.com/customers). You can manage the values and properties of that customer and license by selecting an individual customer.

![](/images/post-screens/create-customer-ship.png)

{{< linked_headline "Customer Name (Required)" >}}

The name of the customer to whom this license is assigned.

{{< linked_headline "Assigned Channel (Required)" >}}

When you create a license you'll need to assign it to a release channel. Stable channel is intended to be used for production installations. Nightly and Beta channels are intended for internal testing. [More about release channel management](/docs/getting-started/manage-releases/).

{{< linked_headline "Customer Type (Required)" >}}

It is important to identify the type of license that is being created, `development`, `trial` or `paid`. Development licenses are designed to be used internally by the development team for testing and integration. Trial licenses should be provided to customers who are on 2-4 week trials of your software. Paid licenses identify the end customer as a paying customer (for which additional information can be provided.)

{{< linked_headline "Archiving Licenses" >}}

When a license is archived in the vendor portal, it will be hidden in the default license search and become read-only. Archival does not affect the utility of license files downloaded before the change. If you wish for them to expire, set an expiration date and policy before archiving. This is a convenience feature for how licenses are displayed in the vendor portal.
