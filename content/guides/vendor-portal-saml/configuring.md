---
date: "2018-01-30T04:02:20Z"
title: "Configuring"
description: "How to configure SAML"
weight: "13002"
categories: [ "Vendor Portal SAML Guide" ]
index: "guides/vendor-portal-saml"
type: "chapter"
gradient: "redToRed"
icon: "replicatedCircle"
---

# Configuring SAML

To configure SAML in the Replicated Vendor Portal, start by logging in to an account that has Admin access. When first enabling SAML, we don't recommend that you disable username/password access at the same time. It's possible (and recommended during testing) to support both SAML and non-SAML authentication on your account at the same time.

## Enable SAML

To start, log in to the Vendor Portal and navigate to the [Teams & Tokens page](https://vendor.replicated.com/team). Click on the Authentication tab to start the SAML setup. If you don't see an Authentication tab, please contact us in Slack or at [https://vendor.replicated.com/support](https://vendor.replicated.com/support). You will now see an unconfigured SAML account, similar to the image below:

![SAML Setup](/images/guides/vendor-portal-saml/unconfigured-saml.png)

Your SAML provider will provide an XML Metadata file and their x.509 Public Cert. For more information on supported SAML providers and how to find these files, please visit the [supported SAML providers guide](../tested-providers).

In this guide, I'll use configure Replicated to use Okta for authentication. I've downloaded these two files from Okta and upload them into each of the fields provided.
