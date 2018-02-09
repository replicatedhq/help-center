---
date: "2016-07-03T04:12:27Z"
title: "Provisioning API"
description: "Provides authentication syncing with a customer's identity server"
weight: "556"
categories: [ "Integration API" ]
index: "docs"
aliases : [docs/reference/integration-api/provisioning-api]
---

## About the Provisioning API

The Provisioning API enables application developers to seamlessly integrate their Identity Service with traditional application flows used in SaaS applications. Instead of implementing full LDAP authentication for their applications, developers can instead expose a set of API endpoints, which Replicated will sync to from the LDAP server.

In this model, applications use the authentication that they already have, and use the API endpoints for managing their user database.

Replicated brokers the interaction between the identity server and your application. Depending on the identity server used and it's configuration, changes are propagated to Replicated via push or periodic polling. Applications do not need to have any knowledge of the LDAP server.

If an application isn't ready to receive requests, by providing anything other than a 2xx response to API calls, the sync will pause and attempt another sync later.

To use this API, configure the `identity` field when packaging your application, [as documented in the Identity Configuration](/docs/packaging-an-application/ldap-integration/)

### Provisioning API vs. Identity API

The Provisioning API and Identity API achieve the same goal with different authentication strategies.

For applications that can support it, the Provisioning API offers data locality and asynchronous updates, giving applications greater performance and control over their user storage. In instances where the identity server is unavailable, users can still login to the application, but the data may be stale until the next successful sync.

In contrast, the Identity API is synchronous, requiring the identity server to be available to successfully authenticate. Alternate login methods may be provided to get around identity server unavailability. For API-driven applications, allowing users to generate API keys may also allow continued operation until the identity server is back online.

## API Flow

When using the Provisioning API, Replicated will bootstrap your user database via an initial sync. After that, it will continue to update your application based on changes. Depending on the identity server used, this can be pull or push on the Replicated side. The Provisioning API will always push user updates to your application.

### Initial Sync

![Provisioning API initial sync flow](/images/integration/provision-sync.png)

During the initial sync phase, Replicated will retrieve all of the available user identities for a given domain search. This will be converted to JSON and posted to the identity endpoint declared in the release YAML identity configuration.

### Update Sync

![Provisioning API update sync flow](/images/integration/update-sync.png)

When a user in the identity service is created or changes after the initial sync, Replicated will propgate those changes to the application individually. Applications are responsible for tracking these updates.

## API Methods

### GET /v1/ping

This call is used to advertise the API's readiness.

#### Response

HTTP status on success: 204

All other status codes will be interpreted as errors and sync will not be initiated.

### POST /v1/user/create

This endpoint is called during the initial sync and when a new user record is being created in the LDAP server. The implementation needs to handle duplicate create calls for the same entity gracefully. For example, a record can be updated or the call can be ignored. Returning an error will result in sync being halted.

#### Request Payload

| Name            | Type   | Description                                                                                                              |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| uuid            | String | (Required) This is the permanent unique user identifier. Note that username can change but still identify the same user. |
| user_id         | String | (Optional) User ID if one is defined by the LDAP server.                                                                 |
| username        | String | (Optional) Username as defined by the ldap_username_field setting.                                                       |
| first_name      | String | (Optional) First name                                                                                                    |
| last_name       | String | (Optional) Last name                                                                                                     |
| full_name       | String | (Optional) Full name                                                                                                     |
| password_format | String | (Optional) Password (encryption/hashing) format                                                                          |
| password        | String | (Optional) Password. Note that this maybe clear text password. This will be indicated by the value in password_format    |
| email           | String | (Optional) Email                                                                                                         |

#### Response

HTTP status on success: 201

All other status codes will be interpreted as errors and sync will not continue.

### POST /v1/user/modify

This endpoint is called when an existing record is being updated in the LDAP server. The implementation needs to handle modify calls for users that don't exist gracefully. For example, a new record maybe created. However, only uuid is guaranteed to be present in the payload. Returning an error will result in sync being halted.

#### Request Payload

At this time the request payload is the same as for /v1/user/create

#### Response

HTTP status on success: 204

All other status codes will be interpreted as errors and sync will not continue.

### DELETE /v1/user/:uuid

This endpoint is called when an existing user record is being deleted. Your implementation should return a 204 response on a delete for a user that does not exist.

#### Request Payload

None

#### Response

HTTP status on success: 204

All other status codes will be interpreted as errors and sync will not continue.
