---
date: "2016-07-07T04:02:20Z"
title: "Authenticating with LDAP"
description: "How to enable authentication in your application using the Replicated LDAP connector"
weight: "2304"
categories: [ "LDAP And Identity Integration" ]
index: "other"
---

One feature of the Replicated LDAP integration is the ability for your application containers to authenticate using a simple REST API that runs inside your application environment. When your application container creates an authentication request against the on-prem Replicated API, Replicated will send the request to the identity provider for login and return a success/error response synchronously.

For details on using the Identity API in your application, refer to the [Identity API](/api/integration-api/identity-api/) reference documentation.
