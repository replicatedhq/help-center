---
date: "2018-01-30T04:02:20Z"
title: "Vendor Portal SAML Overview"
description: "A description of the Vendor Portal SAML feature"
weight: "13001"
categories: [ "Vendor Portal SAML Guide" ]
index: "guides/vendor-portal-saml"
type: "chapter"
gradient: "redToRed"
icon: "replicatedCircle"
---

# Vendor Portal SAML

When starting out with Replciated, most teams grow and add more developers, support engineers and sales engineers. Eventually, managing access to the [Replicated Vendor Portal](https://vendor.replicated.com) can become difficult, as your team grows. Replicated supports logging in using SAML, which enables you to manage access (provisioning and deprovisioning) outside of Replicated. Using SAML, everyone on your team can log in with their existing usernames and passwords, simplifying their experience.

## Enabling

To enable SAML on your account, you must have an [Enterprise](https://www.replicated.com/pricing) plan. If you would like access to SAML, please contact us in Slack or at [https://vendor.replicated.com/support](https://vendor.replicated.com/support).

## SCIM

Replicated does not implement [SCIM](http://www.simplecloud.info/). Instead, we use SAML to authenticate, and create one-time use identities in our system. We do resolve the username (email address) as the actor and use this to ensure that audit log events follow these dynamically provisioned and deprovisioned users.

## RBAC

Replicated supports [Role Based Access Control](/docs/vendor-rbac/overview/) in the Vendor Portal. To use RBAC with SAML, you have to configure policies and add users to the policies by their username. Usernames will be the identity of the user in your IdP (generally this is the full email address).


