---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Two Factor Activation for Customers"
weight: "999999"
categories: [ "Knowledgebase", "Supporting Your Customers" ]
---

In order to ensure that your application and its images are only being used by the companies
that you have authorized to do so, Replicated introduced a feature to tie a license to a
specific email address.

By so doing, the license file is no longer the single factor to access & run your
application. Instead, every time a new instance installation is attempted, Replicated
will require that your customer provide an activation code that has been emailed to
the associated email address of that license.

This feature is activated at the license level. During license creation (you can add/remove
this at anytime... previous installations will not be impacted in anyway, except on
reinstallation).

From the [Customers page](https://vendor.replicated.com/customers), select a customer or
create a new customer:

![Create License](/static/create-customer.png)

Check “Require Activation” & include the email address of your customer.

![Require activation](/static/require-activation.png)

During the installation process, immediately after uploading their license file (before any
of your images are delivered to the customer’s installation) they’ll be prompted to input
the activation code:

![Activate License](/static/activate-license.jpg)

If they check their email they should have an activation code sent from Replicated:

![License Code](/static/license-code.png)
