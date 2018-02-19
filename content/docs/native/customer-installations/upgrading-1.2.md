---
date: "2016-07-03T04:02:20Z"
title: "Upgrading Replicated 1.2"
description: "A guide to installing the legacy version of Replicated 1.2.x via Deb and Yum packages."
hideFromList: true
categories: ["Managing Customer Installation"]
---

{{< warning title="Old Version Warning" >}}
The content in this document is for a previous version of Replicated. If you are looking
for the current version, it is available at
<a href="{{< baseurl >}}/docs/distributing-an-application/upgrading/">{{< baseurl >}}docs/distributing-an-application/upgrading/</a>
{{< /warning >}}

You may need to add the Replicated repository and GPG key to the package manager before
running commands, see [Manual Installation](/docs/distributing-an-application/installing/#manual-installation)
for more details.

### Ubuntu/Debian
```shell
apt-get update
apt-get install replicated replicated-ui replicated-agent
```

### CentOS/RHEL/Fedora
```shell
yum makecache
yum update replicated replicated-ui replicated-agent
```

If you have additional nodes you will independently need to run the following on each of them.

```shell
curl -sSL https://get.replicated.com/agent | sudo sh
```
