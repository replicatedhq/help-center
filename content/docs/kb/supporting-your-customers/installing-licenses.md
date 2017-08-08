---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Installing Licenses"
weight: "999999"
categories: [ "Knowledgebase", "Supporting Your Customers" ]
index: "docs"
---

It's possible your customers might run into problems while uploading their license after 
[installing](/docs/distributing-an-application/installing-via-script/) Replicated.

![Invalid License](/static/license-not-valid.png)

If your customer's encounter this screen please check if the license has expired!

You can do this by visiting:
https://vendor.replicated.com -> app -> licenses page.

If customers see the following screen:

![License Error](/static/license-error.png)

Their license file has been corrupted or modified, you should download a new copy and resend it to 
the customer.

If you utilize Replicated's [license activation](https://support.replicated.com/hc/en-us/articles/216079428-Two-Factor-Activation-for-Licenses) feature your customers might see the following screen:

![License Forbidden](/static/license-forbidden.png)

When this error screen appears you should have your customers check the following:

Has the customer cut and copied the exact code from the LATEST “Replicated License Activation Code” 
email? (Please note that Replicated can send multiple activation emails)
Does this host still have connectivity to Replicated's market API? You can test this by having the 
customer curl -i https://api.replicated.com/market/v1/echo/ip and checking that they get a response.
If all else feels please [contact Replicated](https://support.replicated.com/hc/en-us/requests/new) 
and let us help!
