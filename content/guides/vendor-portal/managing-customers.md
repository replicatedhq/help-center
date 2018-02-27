---
date: "2018-01-30T04:02:20Z"
title: "Managing Your Customers and Licenses"
description: "An overview of managing customers and licenses in the Replicated Vendor Portal"
weight: "900000"
categories: [ "Vendor Portal Guide" ]
index: "guides/vendor"
type: "guide"
gradient: "turquoiseToGreen"
icon: "vendorPortal"
---

{{< linked_headline "Customers" >}}

The Customers Dashboard of Replicated is where you create, manage, and report on customers and their licenses. Customers are created within the context of a single application. If you are deploying multiple applications through Replicated, you will need one customer per application
 even if they are the same.

To access the Customer Dashboard from the vendor portal, first make sure you are using the right application by choosing it in the dropdown and selecting it. From there, navigate to the customer dashboard via the Customers navigation item on the left.

![](/images/guides/vendor/customers.png)

The first time you visit the Customer Dashboard, you are prompted to create your first customer. Click the button to create a customer and issue a license.

> Note that to create a customer, you will need to create your first release and promote it to a channel. See [the guides](/guides) to pick an application release guide specific for the scheduler you want to use.

![](/images/guides/vendor/create-customer.png)

From this page, you can enter all of the details about your customer and their license. Start by naming the customer and clicking "Create customer".

Once this page is saved, you are taken to a page where you can further edit, save, and archive this customer. Additionally, information about expiration date, active instances, reporting, and auditing are available on the top navigation for this customer.

![](/images/guides/vendor/view-customer.png)

To download a license for customer use, click the "Download license" link on the top right. This license is customer-specific and in an on-line installation can be used repeatedly without breaking other installations.

Now that we have created this customer, we can begin to manage their license and information related to it.

{{< linked_headline "License Management" >}}

Naming your customer and downloading their license is just the first step. Depending on how your organization sells software, you may need to offer trials, multiple plans, expiration dates, and more. This section walks through all of the options available to you when creating your customers.

## Assigned channels

Channel assignment is a useful feature for customers who want to test multiple versions of your application. For example, you may have beta branches that are feature incubators. Offering multiple channels to customers provides them the means to test out these updates, and switch back to known working channels should something go wrong.

To change channel assignments, click the "Edit" link next to Assigned channels, select the channels you want them to have access to, as well as the default channel. Once this is correct, click "Done" and "Save Changes". The next time this customer syncs their license, they will have access to the new channels and will be able to switch and install updates from every channel they can access.

## Expiration Policy

The Expiration Policy section lets you choose if, when, and how a customer's license should expire. When enabled, you are required to set an expiration date. After that, you can specify three settings: Ignore, Prevent Updates & Do Not Restart, and Prevent Updates & Stop All Containers.

When ignoring expiration date, Replicated will do nothing. This is useful if you want to have truly soft expiration dates where the expiration is noted in the Vendor Portal. The other options will prevent any updates from occurring, and require you to update the expiration date before they can restart their application. When this is updated, customers can sync their license and resume using the application.

## Update Policy & Application version

These settings specify how your application should update and allow you to lock it to a version if necessary. Automatic updates will be installed by your customers' Replicated instances without manual intervention by the user and can be useful when you want to ensure a particular customer has the latest version of an application.

There may be multiple reasons you would want to pin an application version to a version. For example, if a customer's license has expired, you can allow them to continue using an older version without updates in perpetuity by pinning them to the last version that was released before their license expired. It can also be used in instances where customer infrastructure does not support newer versions of your application.

{{< linked_headline "Customer Reporting" >}}
{{< linked_headline "License Fields" >}}
