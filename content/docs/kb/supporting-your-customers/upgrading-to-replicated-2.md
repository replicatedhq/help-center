---
date: "2016-07-07T00:09:10Z"
lastmod: "2016-07-07T00:09:10Z"
title: "Upgrading to Replicated 2.0"
weight: "999999"
categories: [ "Knowledgebase", "Supporting Your Customers" ]
index: "docs"
---

{{< warning title="Warning" >}}
To prevent loss of data, backing up your server is highly recommended before performing a migration.
{{< /warning >}}

Replicated provides a one line migration script to upgrade your v1 installation to v2. The script will first stop 
your app and backup all Replicated data in case there is a need for a restore. To invoke the migration script all 
you have to do is run the script below and follow the prompts.

```shell
curl -sSL https://get.replicated.com/migrate-v2 | sudo bash
```

