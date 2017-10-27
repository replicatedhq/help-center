---
date: "2017-03-13T00:00:00Z"
lastmod: "2017-10-25T00:00:00Z"
title: "Finding Your API Token and App ID"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Replicated Vendor", "API"]
---

In order to utilize many of the developer API endpoints you will need to know your API Token as well as other items such as your App ID or Channel ID. This document will provide examples of how those values can be located using the cURL utility.

## API Token

API tokens can be generated using the https://vendor.replicated.com/team page. Detailed instructions for generating an API Token can be found
in [Generate an API Token](/docs/kb/developer-resources/generate-api-token).

## App ID

- **Using the Vendor UI**

Your application ID is avaiable on the https://vendor.replicated.com/settings page for your application.

- **Using cUrl**

```shell
curl -X GET \
    -H 'Authorization: <YOUR-API-TOKEN>' \
    https://api.replicated.com/vendor/v1/apps \
    | python -m json.tool
```

You will receive a json response that includes the "App:Id" for each of your Apps along with the "Channel:Id" for each release channel.

## Channel ID

- **Using Replicated CLI**

Once you have your API Token and App ID, you can use [The Replicated Vendor CLI](/api/replicated-vendor-cli) to get channel info.

```shell
replicated --token ... --app ... channel ls
```


- **Using cUrl**

```shell
curl -X GET \
    -H 'Authorization: <YOUR-API-TOKEN>' \
    https://api.replicated.com/vendor/v1/app/<YOUR-APP-ID>/channels \
    | python -m json.tool
```
