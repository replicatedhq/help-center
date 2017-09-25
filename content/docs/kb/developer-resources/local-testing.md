---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Local Testing Setup"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Testing", "Application YAML"]
---

Once you have written some YAML describing your application, you’ll need to begin actually
testing the application on a test server. You can do so by setting up a vagrant machine
or by starting a virtual machine in your favorite IaaS (recommended).

The process for testing a Replicated application requires a bit of iteration. The key
components are:

1. Promote a build to the unstable channel from the [releases page](https://vendor.replicated.com/#/releases)

*Hint: During this iteration process we recommend marking all releases as optional in
order to avoid getting stuck.*

1. Create a developer license for the unstable channel from the licenses page
1. Download the license to your local machine
Then run `curl -sSL https://get.replicated.com/docker | sudo bash` to install Replicated
on your server.

Upload your license and see if your application works as you expected. If not, you might
need to reset the server by running:

### CentOS/RHEL
```shell
yum remove -y replicated replicated-ui replicated-agent replicated-updater
rm -rf /var/lib/replicated
curl -sSL https://get.replicated.com/ | sudo sh
```

### Ubuntu/Debian
```shell
dpkg --purge replicated replicated-ui replicated-agent replicated-updater
rm -rf /var/lib/replicated
curl -sSL https://get.replicated.com/ | sudo sh
```

For this reason we often recommend working with IaaS machines that are disposable during
the early development/testing phase.

If you need to make changes to your application, you can simply create a new release on
the [releases page](https://vendor.replicated.com/#/releases), update the YAML and then
promote it to the top of the unstable channel.

From there you return to your server & click the check for updates button on the dashboard.
If your new release doesn’t show up, there might be an error in the YAML. Then just
promote a new release to the top of unstable and check for updates again on your test
server.
