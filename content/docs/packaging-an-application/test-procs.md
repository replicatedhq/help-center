---
date: "2016-07-03T04:02:20Z"
title: "Test Procs"
description: "Test Procs enable customers to easily test the validity of the unsaved configuration parameters they're entering during installation."
weight: "204"
categories: [ "Packaging an Application" ]
tags: [ "Application YAML", "LDAP" ]
index: "docs"
---

Using the `test_proc` directive in your app definition YAML, you enable your customers to
easily test the validity of the unsaved configuration parameters they're entering.

You can specify a `run_on_save` property in any `test_proc`. if this evaluates to true, all
installations will automatically run the `test_proc` whenever the settings page is saved.
If the `test_proc` fails, a dialog will be displayed.

Test commands are built directly into the Replicated platform. We currently offer the
following set of commands:

{{< linked_headline "Resolve Host" >}}

`resolve_host` – Test whether or not a hostname can be resolved. Applies to a single item.
The item's value will be resolved on the Replicated Management machine. Success or failure
is reported directly on the configuration screen.

```yaml
config:
  items:
  - name: hostname
    title: Hostname
    type: text
    test_proc:
      run_on_save: true
      display_name: Test Hostname Resolution
      command: resolve_host
      arg_fields:
      - hostname
```

{{< linked_headline "GitHub App Auth" >}}

`github_app_auth` – Test whether or not the supplied GitHub app key and secret are valid.
Applies to a group of items. Both mainline and private enterprise versions of GitHub are
supported. This command expects exactly 5 arguments. These arguments come from values
entered by your customer into the config items within this group. The arguments, in
expected order:

1. GitHub service type. Either `github_type_public`, or `github_type_enterprise`.
1. Enterprise service hostname, e.g. `github.mydomain.com`
1. Enterprise service protocol. Either `github_enterprise_protocol_http`, or `github_enterprise_protocol_https`.
1. GitHub app OAuth key.
1. GitHub app OAuth secret.

```yaml
config:
- name: github
  title: GitHub Integration
  description: Provide the location of your GitHub account
  test_proc:
    display_name: Test GitHub Authentication
    command: github_app_auth
    timeout: 5 # in seconds, default is 10
    arg_fields:
    - github_type
    - github_enterprise_host
    - github_enterprise_protocol
    - github_client_id
    - github_client_secret
  items:
  - name: github_type
```

{{< linked_headline "AWS Auth" >}}

`aws_auth` – Test whether or not the supplied AWS key and secret are valid. Applies to a
group of items. This command expects 3 arguments. These arguments come from values entered
by your customer into the config items within this group. The arguments, in expected order:

1. Access key ID.
1. Secret access key.
1. AWS service. Either ec2, s3, or sqs.

```yaml
config:
- name: aws
  title: AWS Integration
  description: Provide your AWS access credentials
  test_proc:
    display_name: Test Authentication
    command: aws_auth
    timeout: 5
    arg_fields:
    - aws_access_key_id
    - aws_secret_access_key
    - aws_service
  items:
  - name: aws_access_key_id
```

{{< linked_headline "Certificate Verification" >}}

`certificate_verify` – Test whether or not the supplied x509 certificate is valid. Optionally
validate the key pair and hostname. Applies to a group of items. This command expects the
certificate as the first argument with additional optional arguments private key and hostname.
These arguments come from values entered by your customer into the config items within this
group. The arguments, in expected order:

1. x509 certificate
1. Private key (optional)
1. Hostname (optional)

```yaml
config:
- name: web_server
  title: Web server settings
  description: Please provide your hostname and TLS cert and key.
  test_proc:
    display_name: Verify TLS settings
    command: certificate_verify
    timeout: 5
    arg_fields:
    - ssl_cert
    - ssl_key
    - hostname
  items:
  - name: hostname
```

{{< linked_headline "SMTP Auth" >}}

`smtp_auth` – Test whether or not the supplied credentials are valid for the given SMTP
server. Note that this procedure only tests authentication; it does not test whether or
not mail is actually deliverable.  

The command expects 5 arguments. These arguments come from values entered by your customer
into the config items within this group. The arguments, in expected order:

- Address:port of the SMTP server to test against
- Whether or not to use SSL/TLS. Possible values: "0" or "1"
- Type of authentication to try. Possible values: "Plain", "CRAM-MD5", "Login" or "None"
- Username to send
- Password to send

**Note that the address of the SMTP server must contain the correct port number ie
smtp.gmail.com:587 for the test proc to validate correctly. A type of "None" will only
ensure the socket is evailable.**

```yaml
config:
- name: email_settings
  title: E-mail Settings
  description: Provide SMTP details which will enable the sending of e-mails
  test_proc:
    display_name: Test SMTP Authentication
    command: smtp_auth
    arg_fields:
    - smtp_address
    - smtp_use_ssl
    - smtp_auth_type
    - smtp_auth_username
    - smtp_auth_password
  items:
  - name: smtp_address
    type: text
```

{{< linked_headline "File Exists" >}}

`file_exists` - Test if a file exists on the host by giving its expected path. This can be
applied to a group or an item, if applied to an item they imply the value, if applied to a
group, then you must specify the item to get the value from. The following arguments are
optional:

1. Regular expression to run against file path (optional)
1. File mode. (optional)
1. File mode is at least (optional - default exact match)

```yaml
config:
- name: some_itmes
  title: Config Items
  items:
  - name: a_file_that_exists
    type: text
    title: Path to file that needs to exist
    test_proc:
      display_name: Check that file exists
      command: file_exists
      args:
      - "^\\/data\\/.+\\.tar$"
      - "644"
      - true
```

{{< linked_headline "Regex Match" >}}

`regex_match` - Test if a given value matches a a regular expression for validation purposes.
This can be applied to a group or an item, if applied to an item they imply the value, if
applied to a group, then you must specify the item to get the value from.

1. Regular expression to run against text area
1. Error message if regular expression doesn't match. (optional)

```yaml
config:
- name: some_items
  title: Config Items
  items:
  - name: phone_number
    type: text
    test_proc:
      display_name: Is this a Phone Number?
      command: regex_match
      args:
      - "^[0-9()-]+$"
      - "That doesn't seem to be a phone number!"
```

{{< linked_headline "LDAP Auth" >}}

`ldap_auth` - This test will ensure that the fields that your customer is supplying are
complete and valid, for a detailed implementation reference see our LDAP integration section.
Note you have to pass all the arg_fields for the test to validate correctly.

These arguments come from values entered by your customer
into the config items within this group.  

Required arguments:

1. `ldap_type` - Type of LDAP integration:
  - `ldap_type_openldap` (A LDAP server other then Active Directory)
  - `ldap_type_ad` (Active directory)
1. `ldap_hostname` - The LDAP host, ie. `ldap.customer.com`
1. `ldap_port` Port LDAP services are listening on ie `389` or `636`
1. `ldap_encryption` - Type of encryption your LDAP is using:
  - `ldap_encryption_plain` (Plain)
  - `ldap_encryption_starttls` (upgrade to SSL/TLS encrypted communication after initial communication)
  - `ldap_encryption_ldaps` (fully encrypted from start)
1. `ldap_search_user` - The LDAP search user that performs user lookup.
1. `ldap_search_password` - The password for the LDAP search user.
1. `ldap_base_dn` - The Distinguished Name (DN) of an LDAP subtree you want to search for users and groups.
1. `ldap_usersearch_dn` - DN to search for users.
1. `ldap_restricted_user_group` - Restricted DN group that only users from this group will be allowed to log in with. This can be an empty string.
1. `ldap_username_field` - The username that will appear on the user's app name field.
1. `ldap_login_username` - The LDAP username that identifies the LDAP user who attempts authentication.
1. `ldap_login_password` - The LDAP password for the user attempting authentication.

Optional arguments:

1. `ldap_advanced_search` - True value indicates that advanced search queries is to be used.
1. `ldap_user_query` - The LDAP query to use to find the user.
1. `ldap_restricted_group_query` - The LDAP query to use to validate user group membership.

```yaml
config:
- name: ldap_settings
  title: LDAP Server Settings
  when: auth_source=auth_type_ldap
  test_proc:
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

```

{{< linked_headline "JSON Validation" >}}

`json_validate` - Tests for valid JSON.  The validate_json test_proc takes a single argument which is the item name that contains the JSON to test.

```yaml
config:
- name: json
  title: Advanced JSON Value
  type: text
  test_proc:
    display_name: Validate JSON
    command: validate_json
    arg_fields:
    - json
```