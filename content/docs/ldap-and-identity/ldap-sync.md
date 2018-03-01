---
date: "2016-07-07T04:02:20Z"
title: "Syncing LDAP Users"
description: "How to sync users from LDAP to your application"
weight: "2305"
categories: [ "LDAP And Identity Integration" ]
index: "other"
---

In addition to authentication, Replicated can sync a directory (or a subset of a directory) to your application. This is useful when your application needs to know the list of all users and expects them to be in a users table in the database.

To sync users from a corporate identity provider, you can use the Replicated Provisioning API, which is available in the context of your application when running behind the firewall. For details, refer to the [Provisioning API reference](/api/integration-api/provisioning-api/).