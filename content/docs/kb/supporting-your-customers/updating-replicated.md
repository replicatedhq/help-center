---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Updating Replicated"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "other"
---

{{< warning title="Old Version Warning" >}}
The content in this document is for a previous version of Replicated. If you are looking
for the current version, it is available at
<a href="/docs/native/customer-installations/upgrading/">{{< baseurl >}}/docs/distributing-an-application/upgrading/</a>
{{< /warning >}}

For your customers to be able to take advantage of the latest features available in
Replicated, they will occasionally need to update the version of Replicated they are
running in their server.

This is done differently based on which OS they are running.

### Ubuntu/Debian
```shell
apt-get update && apt-get install -y replicated replicated-ui replicated-agent replicated-updater
```

### CentOS/RHEL
```shell
yum makecache && yum -y update replicated replicated-ui replicated-agent replicated-updater
```

If they are running a distributed version of your application across multiple hosts, they’ll also need to update the replicated-agent on those machines. To do so, they’ll need to run the following command on each additional host:

```shell
curl -sSL https://get.replicated.com/agent | sudo sh
```

You should make sure that they also [update Docker](https://docs.docker.com/engine/installation/)
to the Replicated supported version as well.
