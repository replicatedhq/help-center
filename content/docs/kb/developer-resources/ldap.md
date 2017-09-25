---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "LDAP Integration"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["LDAP"]
---

## INTRODUCING V1 OF REPLICATED DIRECTORY SERVICE SYNC
You can now offer your Replicated deployed enterprise customers user management through
LDAP & Active Directory by integrating with Replicated’s Directory Service module.

The first version of this feature supports [LDAP 389 DS](http://directory.fedoraproject.org/),
[Free IPA](https://www.freeipa.org/page/Main_Page), [Open LDAP](http://www.openldap.org/) and
Microsoft Active Directory 2008 & 2012.

We’ve done our best to simplify the integration pain points from these legacy legendary
technologies. Instead of writing C connectors, your team can keep building features that
truly differentiate your application.

So, how does it work? There are 2 parts to this… the first piece will do the authentication
& should only take about 3-5 lines of new code. The second piece is optional, takes a bit
more effort but will provide you with full LDAP/AD Sync to your user table (so you can do
things like show a list of users etc). This is the ‘producty’ description...
[developer docs are available](https://replicated.readme.io/docs/identity-api))

## PART 1: AUTH
If you have any type of federated login, then you likely have an if block that determines
which method of authentication is being used. For Replicated DS Auth, you’ll want to check
an envar to determine if DS auth is enabled. If it is, you’ll simply collect the username
& password from the user as normal:

![App Login](/images/post-screens/app-login.png)

You then post that data to the replicated integration api login endpoint (which we register
with every container as an environment variable running in a Replicated install).

![Login API](/images/post-screens/login-api.png)

And we’ll provide you with a success or failure response (`200 OK` or `401 Unauthorized`)

If the response is success, you’ll also also get a response body with the `username`, `DN`
and an array of `attributes`. The attributes array is very powerful as you could instruct
your enterprise customers to include custom attributes in their DS that you can use in
your app. (Quick note: unless you require that your customers include a specific field
in the attributes section, you should not expect it. Every IT runs these systems a bit
differently, so if you need something to be there, require it for your integration.)

## PART 2: SYNC

If you manage a user table in your SaaS product you might want to consider going beyond
simple DS auth and use the Replicated DS Sync functionality
([see sync developer docs](/api/integration-api/)). This will
allow you to access your user table for product features like user profiles, sharing,
attribution etc. Sync is designed to work in conjunction with auth, so make sure you
enable Part 1 before moving on to Part 2.

To do this you’ll need to create a REST provisioning service with specific endpoints.
When you invoke the Replicated Sync we’ll use this endpoint to create, delete & manage
users in your user table, in sync with your customer’s activities in AD or LDAP.

We suggest deploying this as an additional microservice that is only available in your
Replicated installed version when a customer enables DS Sync. You can do this by
identifying this service as an `optional` container in your Replicated YAML.
