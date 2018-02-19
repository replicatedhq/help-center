---
date: "2016-07-07T04:02:20Z"
title: "Multiple LDAP Domains"
description: "Configuring Replicated to authenticate against mulitple LDAP/AD domains"
weight: "2306"
categories: [ "LDAP And Identity Integration" ]
index: "docs/ldap"
---

{{< linked_headline "Advanced LDAP Configuration Specification" >}}

The following JSON schema defines the advanced LDAP config spec. This is especially useful if you intend to support identity management via multiple LDAP domains or organizational units.

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
