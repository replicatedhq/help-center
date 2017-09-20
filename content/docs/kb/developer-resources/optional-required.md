---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Understanding Optional/Required Releases"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["API", "Replicated Vendor"]
---

As continuous integration and continuous deployment (CI/CD) processes have become common
place, rapidly iterating on your software has become a necessity to enable your development
team to deliver quickly and reliably. When shipping enterprise versions through Replicated,
the [Vendor API](https://replicated-vendor-api.readme.io/v1.0/reference) provides
methods to connect an existing CI/CD workflow to your on-prem installations.

If you plan to ship frequent releases to on-prem installations, you should make sure your
release process works well for customers who don't update frequently. Most enterprises
won't apply each update right away, they will need some time to plan the upgrade. Often this
means a customer might be several releases behind and need to “catch up” to the most current
release to get a new feature or fix. Replicated allows releases to be marked as **optional** or
**required** to help manage this process.

## Optional Releases

An optional release is a release that can be skipped, if there is a newer release available.
For example, if a customer is on release `101`, and you've promoted `102` and `103`, both as
optional releases, the customer will never install `102`. When this customer clicks the
update button, it will skip over the `102` optional release and install `103`.

If an optional release is the current release in a channel, it will be installed when a
customer clicks the Update button in the dashboard.

## Required Releases

A required release is a release that should always be installed when applying updates,
even if its an intermediate release. A common reason this is required is when a critical
database migration only exists in a single release and you don't want your customer to
skip over this release. In the same example as above, if a customer is on release `101`,
and you've promoted 102 as an optional release, `103` as a required release, and `104` as an
optional release, when this customer clicks the update button, Replicated will install
103 and then immediately install `104` only after `103` has started successfully.

## Specifying "Optional" or "Required" when promoting a release

![Promote Button](/images/post-screens/promote-button.png)
![Required Release](/images/post-screens/required-release.png)

## Specifying or changing after a release is promoted

It’s also possible to to
[change an existing release](/docs/kb/developer-resources/optional-required/) to
modify whether it's optional or required.
