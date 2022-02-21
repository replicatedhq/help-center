---
date: "2018-01-30T04:02:20Z"
title: "Okta"
description: "How to configure SAML in Okta"
weight: "13004"
categories: [ "Vendor Portal SAML Guide" ]
index: "guides/vendor-portal-saml"
type: "chapter"
gradient: "redToRed"
icon: "replicatedCircle"
---

# Add Replicated Vendor Portal to Okta

## Conguring Okta

Log in to your Admin dashboard, and click applications. Select the "Add a new application" and use these recommended settings:

Create a new application as a SAML 2.0 application.

![Okta New Application](/images/guides/vendor-portal-saml/okta-new-application.png)

Provide a name and icon for the application. We like using the name "Replicated Vendor Portal" and you can download a high quality icon here: [https://help.replicated.com/images/guides/vendor-portal-saml/replicated-application.icon.png](https://help.replicated.com/images/guides/vendor-portal-saml/replicated-application-icon.png).

![Application Name](/images/guides/vendor-portal-saml/application-name.png)

Clicking Next will take you to the "Configuring SAML" page on Okta.

Download the Okta certificate from this page. There is a button on the right, with the caption "Download Okta Certificate". This is your x.509 certificate to provide to Replicated. Download this and keep it safe for the next step.

There are 3 fields to change on this page:

#### Single Sign On URL
This should be set to `https://id.replicated.com/v1/saml`

#### Audience URI (SP Entity ID)
This is displayed on the Vendor Portal authentication tab. This is unique to your team in Replicated.

#### Name ID Format
Change this to `EmailAddress`.

![SSO Settings](/images/guides/vendor-portal-saml/sso-settings.png)

Scroll down and click Next.

On the final screen, select "I'm an Okta customer adding an internal app" and click Finish.

Once you've clicked Finish, you can download the Metadata.xml file by clicking the link titled "Identity provider metadata". This will likely open an XML download, so you can just right click, and Save Link As... to download this file.

![IdP Metadata](/images/guides/vendor-portal-saml/idp-metadata.png)

## Configuring Replicated

On the Replicated Vendor Portal Authentication page, upload your metadata.xml file and your Okta cert.

![Upload To Replicated](/images/guides/vendor-portal-saml/upload-idp.png)

At this point, SAML is configured, but not enabled. You have two options for enforcement, and can continue to the [Enforcing](../enforcing) guide to understand these options.

