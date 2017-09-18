---
date: "2016-07-03T04:12:27Z"
title: "Provisioning API"
description: "Provides authentication and syncing with LDAP sever"
weight: "556"
categories: [ "Integration API" ]
index: "docs"
aliases : [docs/reference/integration-api/provisioning-api]
---

You are (optionally) responsible for implementing a provisioning API to enable full identity sync. Once enabled, Replicated will make calls into this API when changes are detected in the directory service.

When implemented and defined in the [Identity configuration](/docs/packaging-an-application/ldap-integration/), this API will receive the list of LDAP users (initially) and updates when users are added, edited, and removed. Should Replicated receive a non 2xx response from your provisioning endpoint it will stop updates and continue with the same request on the next sync.

### GET /v1/ping

This call is used to advertise the API's readiness.

#### Response

HTTP status on success: 204

All other status codes will be interpreted as errors and sync will not be initiated.

### POST /v1/user/create

This endpoint is called during the initial sync and when a new user record is being created in the LDAP server. The implementation needs to handle duplicate create calls for the same entity gracefully.  For example, a record can be updated or the call can be ignored.  Returning an error will result in sync being halted.

#### Request Payload

| Name | Type | Description |
|---|---|---|
| uuid | String | (Required) This is the permanent unique user identifier. Note that username can change but still identify the same user. |
| user_id | String | (Optional) User ID if one is defined by the LDAP server. |
| username | String | (Optional) Username as defined by the ldap_username_field setting. |
| first_name | String | (Optional) First name |
| last_name | String | (Optional) Last name |
| full_name | String | (Optional) Full name |
| password_format | String | (Optional) Password (encryption/hashing) format |
| password | String | (Optional) Password. Note that this maybe clear text password. This will be indicated by the value in password_format |
| email | String | (Optional) Email |

#### Response

HTTP status on success: 201

All other status codes will be interpreted as errors and sync will not continue.

### POST /v1/user/modify

This endpoint is called when an existing record is being updated in the LDAP server. The implementation needs to handle modify calls for users that don't exist gracefully.  For example, a new record maybe created.  However, only uuid is guaranteed to be present in the payload.  Returning an error will result in sync being halted.

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
