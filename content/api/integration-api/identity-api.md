---
date: "2016-07-03T04:12:27Z"
title: "Identity API"
description: "Provides authentication and syncing with LDAP sever"
weight: "555"
categories: [ "Integration API" ]
index: "docs"
aliases : [docs/reference/integration-api/identity-api]
---

Replicated currently supports integration with LDAP. Identity API provides authentication and syncing with LDAP sever.

## Identity API Endpoint

The Identity API is part of the Integration API. To discover the Integration API base endpoint, query the REPLICATED_INTEGRATIONAPI environment variable from inside your container.

## LDAP Authentication

### POST /identity/v1/login

Authenticates the user and returns the corresponding entry properties.

Request payload

| Name | Type | Description |
|---|---|---|
| username | String | As defined by the ldap_username_field setting |
| password | String | Cleartext passowrd |

Response Status code

| Status | Description |
|---|---|
| 200 | User authenticated successfully |
| 401 | Invalid username or password |

In case 200 is returned, the body of the response will contain LDAP properties for the authenticated user entry. The password attribute will be omitted from the result.

Response body

| Name | Type | Description |
|---|---|---|
| DN | String | LDAP DN for the user's entry |
| Username | String | Username |
| Attributes | Array | An array of available LDAP attributes for the user's entry, including any custom attributes for the user. |
| Groups | Array | Array of groups that the user belongs to. Each group contains group's DN and a list of its LDAP attributes. |

#### Example

Note that the response JSON has been prettified for easier reading.

cURL
```bash
{
  "DN": "cn=Test User,ou=users,dc=replicated,dc=com",
  "Username": "testuser",
  "Groups": [{
    "DN": "cn=replicated,ou=groups,dc=replicated,dc=com",
    "ID": "501",
    "Name": "replicated",
    "Attributes": {
      "cn": ["replicated"],
      "gidnumber": ["501"],
      "memberuid": ["testuser", "testuser2", "testuser3", "testuser4"],
      "objectclass": ["posixGroup", "top"]
    }
  }],
  "Attributes": {
    "cn": ["Test User"],
    "gidnumber": ["500"],
    "givenname": ["Test"],
    "homedirectory": ["/home/users/testuser"],
    "objectclass": ["inetOrgPerson", "posixAccount", "top"],
    "sn": ["User"],
    "uid": ["testuser"],
    "uidnumber": ["1005"]
  }
}
```

### GET /identity/v1/user/:username

Returns properties for the specified user.

| Response | Status code |
|---|---|
| 200 | User authenticated successfully |
| 401 | Invalid username or password (for LDAP search user) |
| 404 | Requested user is not found |

In case 200 is returned, the body of the response is the same as that of the /identity/v1/login call.

### GET /identity/v1/user/:username/exists

Checks if the supplied username exists on the server and returns true or false.

In case 200 is returned, the body of the response will be true if the user exists or false otherwise.

| Status | Description |
|---|---|
| 200 | Check completed successfully |
| 401 | Invalid username or password |

#### Examples

cURL
```bash
$ curl -k -i $REPLICATED_INTEGRATIONAPI/identity/v1/user/jdoe/exists
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Wed, 14 Oct 2015 19:00:30 GMT
Content-Length: 4

true
```

cURL
```bash
$ curl -k -i $REPLICATED_INTEGRATIONAPI/identity/v1/user/badusername/exists
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Wed, 14 Oct 2015 19:00:30 GMT
Content-Length: 5

false
```
