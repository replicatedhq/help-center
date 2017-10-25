---
date: "2016-07-01T00:00:00Z"
lastmod: "2017-10-25T00:00:00Z"
title: "Generate an API Token"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["API", "Replicated Vendor"]
---

To interact with the [vendor API](https://replicated-vendor-api.readme.io/v1.0/reference)
(anything that is available in the vendor web portal is available in the API) you’ll need to create API tokens.  API tokens identify your team and depending on your needs the API token can be read or read/write.  Using the API you can automate most of your development and license issuing workflows.

After you have created your API token use it in the `Authorization` header for vendor API calls.

```sh
curl --header "Authorization: API-TOKEN" https://api.replicated.com/vendor/v2/licenses
```

To create an API token you use your https://vendor.replicated.com/team page.


![Generate API Token](/images/post-screens/generate-token.png)
