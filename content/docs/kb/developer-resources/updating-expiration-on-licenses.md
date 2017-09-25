---
date: "2017-03-13T00:00:00Z"
lastmod: "2017-03-13T00:00:00Z"
title: "Updating Expiration on Licenses"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Replicated Vendor", "API"]
---

An example use case for using the Vendor API is license maintenance. This example will show how to extend the expiration dates of all licenses in a specific channels.

## Prerequisites
1. An API Token with Read/Write access
2. The target App ID
3. The target Channel ID

For details on how to get the App ID and Channel ID, refer to [Finding Your API Token and App ID](/docs/kb/developer-resources/finding-your-api-token-and-app-id). These values will not change and should be supplied as static values to your license updating script.

### 1) Get all outstanding licenses
To start, get all the licenses that have been issued for a specific app:

```shell
curl -X GET \
    -H 'Authorization: <YOUR-API-TOKEN>' \
    https://api.replicated.com/vendor/v2/app/<YOUR-APP-ID>/licenses
```

### 2) Find expiring licenses
Iterate through the returned array from step 1 to create a new array that contains all licenses where "ChannelId" fields match your target channel ID. Select the licenses you want to extend from this array.

### 3) Update expiring licenses
Issue a single API call to the Vendor API for each license in the array to update the expiration date. An example of this (using cURL) is:

```shell
curl -X PUT \
    -H 'Authorization: <YOUR-API-TOKEN>' \
    -H 'Content-Type: application/json' \
    https://api.replicated.com/vendor/v2/license/<YOUR-LICENSE-ID> \
    -d '{"license_type":"dev",
        "activation_email": false,
        "airgap_download_enabled": false,
        "assignee":"Original Assignee Name",
        "update_policy":"manual",
        "channel_id":"<YOUR-CHANNEL-ID>",
        "expiration_date":"2018-03-13",
        "expiration_policy":"ignore",
        "require_activation":false}'
```
