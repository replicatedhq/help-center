---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Installing Known Versions of Replicated"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Installing Replicated"]
---

We recognize that developers depend on Replicated to provide a known experience each and every installation.

Starting with Replicated 2.3.0 we support specifying the version of Replicated you want to use via the app YAML and Replicated can auto update itself during app updates. By using the channel install script the installer will automatically select the right version of Replicated for you. When updating your application, if the version of Replicated is lower than you specified, Replicated will auto update prior to installing your software. The auto update happens automatically and does not require any effort on your customers behalf.

To specify the version to use, add replicated_version into your preflight checks:

```
replicated_api_version: 2.4.2

host_requirements:
  replicated_version: ">=2.4.2 < 2.9.0"
```

For the installer to use the version of Replicated you specify you should use the channel release install script url. This version of the script is similar to the easy install url but is customized based on your app YAML. To get the install link, login to your [vendor.replicated.com](https://vendor.replicated.com/) account, select your app and click "build history" for your channel and click "Copy install script url".

## Installing earlier versions

To install older versions of Replicated after 2.0 we support specifying the version in the install url.

```shell
curl -sSL "https://get.replicated.com/docker?replicated_tag=2.3.2" | sudo bash
```

On older versions of Replicated it may be necessary to install alternative versions of the Operator and UI containers. You can specify the additional query parameters of `replicated_ui_tag` and `replicated_operator_tag` to pin versions of these products.

```shell
curl -sSL "https://get.replicated.com/docker?replicated_tag=2.0.1649&replicated_ui_tag=2.0.38&replicated_operator_tag=2.0.36" | sudo bash
```

# Best Practices

Here are some best practices for installing your application with Replicated.

## 1. Always install versions of the Replicated components that are known to work together

If you are just starting, we recommend using the host requirements to set the Replicated version. When moving to a newer version of Replicated always test your application prior to release. On a regular basis test the latest Replicated version by updating your replicated_version range and when ready publish it to your customers. Subscribe to and read our [release notes](https://release-notes.replicated.com).

## 2. Proxy this to give out a branded and standard install url

For example, if you want to host the installation script on https://get.company.com/docker, we recommend setting up an nginx proxy. Proxy /docker externally to https://get.replicated.com/docker/app-id/channel-name.

## 3. Install latest for support sometimes

Occasionally, when supporting a customer running an older version of Replicated, we may ask that they upgrade it. We ship new versions constantly, and often will have a fix in a newer version. For this reason, we encourage you to keep as close to latest as possible.

We definitely encourage and support any installation that is running a production release of Replicated. We encourage you to install our latest release if possible but use host requirements to control when your customers start using the new version.
