---
date: "2016-12-01T00:00:00Z"
lastmod: "2016-12-01T00:00:00Z"
title: "Manage Custom License Fields"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Replicated Vendor"]
---

Custom license fields are key value pairs that can be created in the vendor portal, securely delivered to each on-prem instance and kept in sync through automated update checks. This is useful if specific application level information might change from customer to customer.

Examples of custom license fields are "seats" to limit the number of active users or "hostname" in order to specify the domain that the application can be run on.

## Creating Custom License Fields
Custom license fields are generally created and managed from the [License Fields section](https://vendor.replicated.com/license-fields) of the vendor portal. Any new `Required` field will need to be set for all existing Customers (either with custom data or by using the `Default` value) as well as all future Customers. Fields that are marked as `Hidden` will not be displayed on the :8800/license page of the on-prem admin console. `Title` will be the name that is displayed on the :8800/license page of the on-prem console. `Field` is the unique id. `Type` is either an 'integer', 'string' or 'text' type.

## Setting Custom License Fields
The values can then be set for each Customer in the manage customer screen of the [vendor portal](https://vendor.replicated.com/customers) in the same way that standard customer fields are managed.

## Accessing the Field Values
These values are available in the on-prem instance and can be used to configure or alter the application. During configuration, these fields can be read from the [template functions](/docs/packaging-an-application/template-functions#licensefieldvalue) and then used to overwrite config files or be injected as environment variables. Once the application is running, these values are synced automatically on the update check interval. Changes can be detected in the running instance by polling the [Licensing Integration API](https://replicated.readme.io/docs/license-api).

These fields are cryptographically signed by Replicated using PKI and the Replicated components will not install or update the license fields if the data does not match the signature.
