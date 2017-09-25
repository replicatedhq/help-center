---
date: "2017-03-13T00:00:00Z"
lastmod: "2017-03-13T00:00:00Z"
title: "Finding Your API Token and App ID"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Replicated Vendor", "API"]
---

In order to utilize many of the developer API endpoints you will need to know your API Token as well as other items such as your App ID or Channel ID. This document will provide examples of how those values can be located using the cURL utility.

## API Token
You can create and show your API Token inside your Vendor Web portal by clicking on the [Teams & Tokens](https://vendor.replicated.com/#/team) link.

## App ID
To list your apps:

```shell
curl -X GET \
    -H 'Authorization: <YOUR-API-TOKEN>' \
    https://api.replicated.com/vendor/v1/apps \
    | python -m json.tool
```

You will receive a json response that includes the "App:Id" for each of your Apps along with the "Channel:Id" for each release channel.

## Channel ID
To look up a Channel ID for a specific App:

```shell
curl -X GET \
    -H 'Authorization: <YOUR-API-TOKEN>' \
    https://api.replicated.com/vendor/v1/app/<YOUR-APP-ID>/channels \
    | python -m json.tool
```
