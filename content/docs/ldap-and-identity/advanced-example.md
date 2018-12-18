---
date: "2016-07-07T04:02:20Z"
title: "Advanced LDAP Example"
description: "Configuring Replicated to authenticate against mulitple LDAP/AD domains"
weight: "2309"
categories: [ "LDAP And Identity Integration" ]
index: "other"
aliases : [docs/ldap-and-identity/multi-domains/]
---

The following example shows the use of some of the more powerful features of the Replicated [Advanced LDAP identity integration](/docs/ldap-and-identity/advanced/) including multiple domains and multiple organizational units.

See the [Advanced LDAP Specification](/docs/ldap-and-identity/advanced-spec/) for more details.

```json
[
	{
		"ServerType": "ad",
		"Hostname": "ad.replicated.systems",
		"Port": 389,
		"Encryption": "plain",
		"BaseDN": "DC=ad,DC=replicated,DC=com",
		"UserSearchDNs": [
			"OU=la",
			"OU=ny",
			"OU=sf"
		],
		"FieldUsername": "sAMAccountName",
		"SearchUsername": "CN=Administrator,CN=Users,DC=ad,DC=replicated,DC=com",
		"SearchPassword": "Password1",
		"LoginUsername": "em",
		"LoginPassword": "Password1",
		"AdvancedSearch": true,
		"UserQuery": "(sAMAccountName={{username}})",
		"GroupQuery": "(|(&(memberOf=CN=Retraced,CN=Builtin,DC=ad,DC=replicated,DC=com)(sAMAccountName={{username}}))(&(memberOf=CN=Replicated,CN=Builtin,DC=ad,DC=replicated,DC=com)(sAMAccountName={{username}})))"
	},
	{
		"ServerType": "openldap",
		"Hostname": "openldap.replicated.systems",
		"Port": 389,
		"Encryption": "plain",
		"BaseDN": "dc=replicated,dc=com",
		"UserSearchDNs": [
			"ou=la",
			"OU=ny",
			"OU=sf"
		],
		"FieldUsername": "uid",
		"SearchUsername": "cn=admin,dc=replicated,dc=com",
		"SearchPassword": "password",
		"RestrictedGroupCNs": [
			"Replicated"
		],
		"LoginUsername": "em",
		"LoginPassword": "password"
	}
]
```
