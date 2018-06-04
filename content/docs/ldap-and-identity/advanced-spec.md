---
date: "2018-06-04T12:02:20Z"
title: "Advanced LDAP Config Spec"
description: "Enabling LDAP and AD user auth and sync in an application through Replicated."
weight: "2308"
categories: [ "LDAP And Identity Integration" ]
index: "other"
---

The following JSON schema defines the Advanced LDAP configuration specification. This is especially useful if you intend to support identity management via multiple LDAP domains or organizational units.

```json
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"type": "array",
	"items": {
		"$ref": "#/definitions/ldap_host"
	},
	"definitions": {
		"ldap_host": {
			"type": "object",
			"properties": {
				"ServerType": {
					"type": "string",
					"enum": ["openldap", "ad", "other"]
				},
				"Hostname": {
					"type": "string",
					"format": "hostname"
				},
				"Port": {
					"type": "integer"
				},
				"Encryption": {
					"type": "string",
					"enum": ["plain", "starttls", "ldaps"]
				},
				"BaseDN": {
					"type": "string"
				},
				"UserSearchDNs": {
					"type": "array",
					"items": {
						"type": "string"
					},
					"minItems": 1
				},
				"FieldUsername": {
					"type": "string"
				},
				"SearchUsername": {
					"type": "string"
				},
				"SearchPassword": {
					"type": "string"
				},
				"RestrictedGroupCNs": {
					"oneOf": [
						{
							"type": "array",
							"items": {
								"type": "string"
							}
						},
						{
							"type": "null"
						}
					]
				},
				"LoginUsername": {
					"type": "string"
				},
				"LoginPassword": {
					"type": "string"
				},
				"AdvancedSearch": {
					"type": "boolean"
				},
				"UserQuery": {
					"type": "string"
				},
				"GroupQuery": {
					"type": "string"
				}
			},
			"required": [
				"ServerType", "Hostname", "Port", "Encryption", "BaseDN",
				"UserSearchDNs", "FieldUsername", "SearchUsername",
				"SearchPassword"
			],
			"additionalProperties": false
		}
	}
}
```
