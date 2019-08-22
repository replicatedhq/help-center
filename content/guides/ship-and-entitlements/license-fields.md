---
date: "2019-07-31T12:00:00Z"
title: "Defining License Fields"
description: "A walkthrough of defining License Fields (entitlements) and creating customer values."
weight: "30302"
categories: [ "Ship and Entitlements" ]
index: "guides/ship-and-entitlements"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

# Defining License Fields

Custom License Fields can be defined on the [License Fields](https://vendor.replicated.com/license-fields) page on the left hand nav bar of the Replicated Vendor Portal.

{{< linked_headline "Creating Custom Fields" >}}

To get started click the "Create a custom field" button.

![Create a custom field](/images/guides/ship-and-entitlements/create-a-custom-field.png)

The License Field can then be configured to your specification. For the purposes of this guide we will create a `num_seats` field to enforce the number of accounts on a per-customer basis for our single-tenant enterprise application. Enter in all the fields and click the "Create" button to save the field.

![Add a new field](/images/guides/ship-and-entitlements/add-a-new-field.png)

{{< linked_headline "Defining Customer Values" >}}

Navigate to the [Customers](https://vendor.replicated.com/customers) page from the left hand nav bar and select an existing customer. You will now see the "Number of Seats" field in the "Custom fields" section at the bottom of the page. Enter a number or leave the default and click the "Save" button.

![Customer entitlements](/images/guides/ship-and-entitlements/customer-entitlements.png)

The next few sections will guide you through ingesting these entitlements in your Replicated Ship application.
