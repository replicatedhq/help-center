---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Generate a Support Bundle from the CLI"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Support"]
---

If your customer cannot access the Replicated UI, you can still have them 
download the support bundle from the Replicated CLI by running the following 
commands on the server:

*Note: If your on-premise console has a password you will need to authenticate 
on the CLI*

```shell
replicated apps
replicated support-bundle <app_id>
```

Where <app_id> is the id of your application taken from the output of the first command.

(Available in versions of Replicated 1.2.73 and higher)