---
date: "2016-07-03T04:12:27Z"
title: "Integration API"
description: "The Replicated Integration API is hosted with Replicated’s on-premise daemon and allows your services to call and be called by the local Replicated server."
weight: "502"
index: false
categories: [ "Reference" ]
gradient: "purpleToPink"
aliases: [docs/reference/integration-api]
---

The Integration API is the primary mechanism for developers to integrate their applications with Replicated's management console and APIs.

## Accessing the Integration API

The Integration API can be accessed by using the `$REPLICATED_INTEGRATIONAPI` environment variable injected into all application containers. After that, every resource can be used by applications to offer features such as airgap detection, LDAP authentication and syncing support, and update checks.

## Giving Users a Good Experience

The Integration API is designed to enable application developers to seamlessly give every on-prem user the same experience, regardless of the environment it's in. For example, the Integration and Provisioning APIs allow users to integrate their application with every enterprise environment using an enterprise identity provider, such as LDAP or Active Directory. The Audit API helps with enterprise compliance requirements by providing a write-once, read-many storage mechanism for user actions within the Replicated console, as well as applications.

Providing an enterprise native experience to users allows them to use your application while reaping the benefits of their enterprise environment. However, all applications don't necessarily need to use every part of the integration API to feel native. Use the parts of the Integration API needed for your application to seamlessly integrate into enterprise environments.

## API Resources
<br/>

#### [Audit API](audit-api)

<span class="u-marginBottom--more u-display--block">
    Read and write to audit events to the Replicated audit log.
</span>

#### [Version API](version-api)

<span class="u-marginBottom--more u-display--block">
    Read the current application version, release notes, pending updates and apply updates
</span>

#### [License API](license-api)

<span class="u-marginBottom--more u-display--block">
    Provides methods for your application to query properties of the installed license
</span>

#### [Status API](status-api)

<span class="u-marginBottom--more u-display--block">
    Provides endpoints for your application to report various kinds of status information back to the management console
</span>

#### [Identity API](identity-api)

<span class="u-marginBottom--more u-display--block">
    Provides authentication with identity servers
</span>

#### [Provisioning API](provisioning-api)

<span class="u-marginBottom--more u-display--block">
    Provides authentication syncing with a customer's identity server
</span>

#### [Console API](console-api)

<span class="u-marginBottom--more u-display--block">
    API to use the Replicated console settings
</span>
