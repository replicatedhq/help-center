---
date: "2016-07-07T04:02:20Z"
title: "LDAP and Identity Integration"
description: "Enabling LDAP and AD user auth and sync in an application through Replicated."
weight: "216"
categories: [ "Packaging an Application" ]
tags: [ "Application YAML", "LDAP" ]
index: "docs"
---

Replicated can be integrated with LDAP servers to provide real time user authentication & sync. A quick overview of this feature is available. Announcement: [DS Auth & Sync Support](https://blog.replicated.com/2015/12/03/ldap-active-directory-sync-support/)

{{< linked_headline "Configuration" >}}

At the root level, configure the identity object

```yaml
identity:
  enabled: '{{repl if ConfigOptionNotEquals "auth_source" "auth_type_internal"}}true{{repl else}}false{{repl end}}'
  provisioner: 'http://{{repl NodePrivateIPAddress "MyContainerName" "Container Image Name"}}:6006'
  sources:
  - source: ldap
    enabled: '{{repl if ConfigOptionEquals "auth_source" "auth_type_ldap"}}true{{repl else}}false{{repl end}}'
  - source: ldap_advanced
    enabled: '{{repl if ConfigOptionEquals "auth_source" "auth_type_ldap_advanced"}}true{{repl else}}false{{repl end}}'
```

| Field |	Description |
|-------|-------------|
| enabled | This should be copied as shown in the example. The value will depend on the settings provided below. |
| provisioner | (Optional) Host that provides provisioning API for synchronization with LDAP. This field can be omitted if synchronization is not needed. |
| sources | Only `ldap` source is supported at this time. Leave this setting as shown in the example. |

In the config section, add LDAP server configuration

{{< note title="Setting names" >}}
Setting labels can be customized if needed. However, setting names must remain exactly as shown in this example.
{{< /note>}}

```yaml
- name: auth
  title: Authentication
  description: Where will user accounts be provisioned
  items:
  - name: auth_source
    default: auth_type_internal
    type: select_one
    items:
    - name: auth_type_internal
      title: Built In
    - name: auth_type_ldap
      title: LDAP
    - name: auth_type_ldap_advanced
      title: LDAP Advanced
- name: ldap_settings
  title: LDAP Server Settings
  when: auth_source=auth_type_ldap
  test_proc:
    # Optional.
    # When defined, the Test button will be shown on the LDAP settings section which will allow validating
    # the supplied credentials.  When this is enabled ldap_login_username and ldap_login_password must be defined.
    display_name: Test Credentials
    command: ldap_auth
    arg_fields:
    - ldap_type
    - ldap_hostname
    - ldap_port
    - ldap_encryption
    - ldap_search_user
    - ldap_search_password
    - ldap_base_dn
    - ldap_usersearch_dn
    - ldap_restricted_user_group
    - ldap_username_field
    - ldap_login_username
    - ldap_login_password
    - ldap_advanced_search
    - ldap_user_query
    - ldap_restricted_group_query
  items:
  - name: ldap_type
    # LDAP server type.  All standard LDAP implementations are supported.
    # In order to use Provisioning API, the LDAP server (AD being an exception) must support the Content Sync feature.
    title: LDAP Server Type
    type: select_one
    default: ldap_type_openldap
    items:
    - name: ldap_type_openldap
      title: OpenLDAP
    - name: ldap_type_ad
      title: Active Directory
    - name: ldap_type_other
      title: Other
  - name: ldap_hostname
    # LDAP host name without port or protocol.  Example: ad.bigbank.com
    title: Hostname
    type: text
    value: '{{repl LdapCopyAuthFrom "Hostname"}}'
    required: true
  - name: ldap_port
    # LDAP port number.  This can be different for different encryption types.
    title: Port
    type: text
    value: '{{repl LdapCopyAuthFrom "Port"}}'
    default: 389
    required: true
  - name: label_encryption_label
    # Encryption type.  Self-signed certificates are not supported at this time when LDAPS or StartTLS is selected.
    title: Encryption Type
    type: label
  - name: ldap_encryption
    type: select_one
    default: ldap_encryption_plain
    items:
    - name: ldap_encryption_plain
      title: Plain
    - name: ldap_encryption_starttls
      title: StartTLS
    - name: ldap_encryption_ldaps
      title: LDAPS
  - name: ldap_search_user
    # DN of the user with search privileges.
    title: Search user
    type: text
    value: '{{repl LdapCopyAuthFrom "SearchUsername"}}'
    required: true
  - name: ldap_search_password
    # The password to use to login as the Search User.
    title: Search password
    type: password
    value: '{{repl LdapCopyAuthFrom "SearchPassword"}}'
    required: true
  - name: ldap_schema
    type: heading
    title: LDAP schema
  - name: ldap_base_dn
    # Base DN for user search.  Example: DC=ad,DC=bigbank,DC=com
    title: Base DN
    type: text
    value: '{{repl LdapCopyAuthFrom "BaseDN"}}'
    required: true
  - name: ldap_usersearch_dn
    # User search DN.  Together with Base DN, it should form a valid search DN: <User Search DN>,<Base DN>
    title: User search DN
    type: text
    value: '{{repl LdapCopyAuthFrom "UserSearchDNFirst"}}'
    default: ou=users
    required: true
  - name: ldap_advanced_search
    # This option must be selected in order to use advanced search features.   Otherwise, it can be omitted.
    title: Show Advanced Search Options
    help_text: Enable this option if you need to write a custom LDAP search query.
    type: bool
    value: 0
  - name: ldap_restricted_user_group
    # Group name that the user must belong to.  This string must only contain the group name
    # without an LDAP search query.
    title: Restricted User Group
    type: text
    value: '{{repl LdapCopyAuthFrom "RestrictedGroupCNFirst"}}'
    required: false
    when: ldap_advanced_search=0
  - name: ldap_user_query
    # LDAP query that should be used to lookup users.  The query should contain a {{username}} placeholder that
    # will be replaced with the actual user name that is being looked up.
    # Example: (sAMAccountName={{username}})
    title: User Query
    type: text
    value: '{{repl LdapCopyAuthFrom "UserQuery"}}'
    required: false
    when: ldap_advanced_search=1
  - name: ldap_restricted_group_query
    # LDAP query that should be used to validate user group membership.
    # The query can container two placeholders:
    #   {{userdn}} - this placeholder will be replaced with the user's DN value.
    #   {{username}} - this placeholder will be replaced with the user name
    # Example: (|(&(cn=Accounting)(memberuid={{username}})))
    title: Restricted User Group Query
    type: text
    value: '{{repl LdapCopyAuthFrom "RestrictedGroupQuery"}}'
    required: false
    when: ldap_advanced_search=1
  - name: ldap_username_field
    # The LDAP field that will contain the user name.  Typically it will be uid.
    # Active Directory uses sAMAccountName.
    title: Username field
    type: text
    value: '{{repl LdapCopyAuthFrom "FieldUsername"}}'
    default: uid
    required: true
  - name: ldap_login_username
    # Optional user name filed.  This can be used with test_proc to validate credentials before saving.
    title: Test username
    type: text
    required: false
  - name: ldap_login_password
    # Optional password filed.  This can be used with test_proc to validate credentials before saving.
    title: Test password
    type: password
    required: false
- name: ldap_settings_advanced
  title: LDAP Advanced Server Settings
  description: |
    Upload a file below for advanced integration configuration. This file must conform to the 
    [Advanced LDAP Configuration Specification](https://help.replicated.com/docs/packaging-an-application/ldap-integration/#advanced-ldap-configuration-specification).
  when: auth_source=auth_type_ldap_advanced
  test_proc:
    # Optional.
    # When defined, the Test button will be shown on the LDAP settings section which will allow validating
    # the supplied file.
    display_name: Validate Config
    command: ldap_config_validate
    run_on_save: true
    arg_fields:
    - ldap_config_file
  items:
  - name: ldap_config_file
    # LDAP server type.  All standard LDAP implementations are supported.
    # In order to use Provisioning API, the LDAP server (AD being an exception) must support the Content Sync feature.
    title: LDAP Config File
    type: file
    required: true
```

Note the use of the LdapCopyAuthFrom function. This is optional, but when LDAP is used to secure the Replicated console, settings entered on that screen will be copied as default values.

{{< linked_headline "Identity API" >}}

See [Identity API](/api/integration-api) for information on how to authenticate and sync with LDAP server.

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
