---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Branding Your Configuration Screen"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Replicated UI", "Branding"]
---

With the release of Replicated 1.2.73 you can now customize the look & feel of the
dashboard of your on-prem customer experience.

To get started visit the [vendor portal](https://vendor.replicated.com/), and navigate to the "Channels" page for your application. Then, click "Edit channel info".

![CSS Buttons](/images/post-screens/edit-channel.png)

Branding is staged by channel, so that you can test your branding before shipping it to
customers. If you remove the branding & leave a comment in the CSS
`/* show minimal */` you’ll get a minimalist version of Replicated UI:

![Minimal CSS](/images/post-screens/minimal-css.png)

By default, existing vendors will have the traditional purple, organge, teal colors set as
their default CSS for all channels. Existing client installations will fallback to the
traditional colors if no CSS is available.

Updates to the CSS are applied at installation (new install), when a customer updates to a
Replicated brandable version (1.2.73 or newer) and then anytime an app update is applied.
CSS updates are not applied during a standard Replicated daemon update or during a
license sync.

Currently the supported items are labeled below:

![CSS Elements](/images/post-screens/css-elements.png)
