---
date: "2016-07-03T04:02:20Z"
title: "Upgrading Replicated"
description: "The process for end customers to update Replicated services to access the latest improvements to the underlying system since their installation."
weight: "303"
categories: [ "Distributing An Application" ]
tags: ["Upgrading Replicated", "Airgapped Environment"]
index: "docs"
---

{{< note title="Replicated 2.0" >}}
The content in this document is specific to updating an existing easy install script installed
Replicated instance. If you are looking for the
Replicated 1.2 version of this document it is available at
<a href="/docs/distributing-an-application/upgrading-1.2/">{{< baseurl >}}distributing-an-application/upgrading-1.2/</a>
{{< /note >}}

You can update all Replicated component versions to latest by re-running the installation
script.

```shell
curl -sSL https://get.replicated.com/docker | sudo bash
```

If you have additional nodes you will independently need to run the following on each of them.

```shell
curl -sSL https://get.replicated.com/operator | sudo bash
```

## Upgrading Airgap Installs
Airgap installations can be upgraded by downloading a newer version of the Replicated release, uncompressing it and re-running the install script using the airgap flag.  The latest Replicated release can be found at https://s3.amazonaws.com/replicated-airgap-work/replicated.tar.gz.

```shell
tar xzvf replicated.tar.gz
cat ./install.sh | sudo bash -s airgap
```


## Migrating from Replicated v1 to v2
Replicated provides a one line migration script to upgrade your v1 installation to v2. The script will first stop your app
and backup all Replicated data in case there is a need for a restore. To invoke the migration script all you have to do
is run the script below and follow the prompts.

```shell
curl -sSL https://get.replicated.com/migrate-v2 | sudo bash
```

{{< warning title="Warning" >}}
To prevent loss of data, backing up your server is highly recommended before performing a migration.
{{< /warning >}}