---
date: "2018-01-30T04:02:20Z"
title: "Enforcing"
description: "Enforcing SAML in the Vendor Portal"
weight: "13005"
categories: [ "Vendor Portal SAML Guide" ]
index: "guides/vendor-portal-saml"
type: "chapter"
gradient: "redToRed"
icon: "replicatedCircle"
---

# SAML Enforcement Options

Once you have SAML configured, Replicated provides 2 options that can be enabvled or disabled at any time.

![SAML Enforcement Options](/images/guides/vendor-portal-saml/enforcement-options.png)

## Enable SAML for team logins

Turning on the "Enable SAML for team logins" toggle will allow members of your team to log in to the Vendor Portal from your SSO provider. This will not remove, change or restrict any other authentication methods you have configured on Replicated. If you enable SAML and your team already is logging in with accounts provisioned in Replicated, they will be able to continue logging in with those accounts. Allowing both login methods is a good way to test SAML without risking any interruption for the rest of your team.

## Only allow SAML logins

Once you've enabled SAML and validated it, you can then turn this feature on. Selecting this will prevent any non-SAML accounts from logging in.

We don't delete the existing accounts. If you turn this on and then later disable it, accounts that never logged in via SAML will be able to log in again. If an account exists outside of SAML, and if then authenticated with SAML, the account is converted and will not be able to authenticate using a password again.
