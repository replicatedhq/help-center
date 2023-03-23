---
date: "2016-07-03T04:02:20Z"
title: "Test Procedures"
description: "The config section of the Replicated YAML creates a dynamic settings page that customers can use to configure their instance."
weight: "304"
categories: [ "Config Screen" ]
index: "other"
aliases: [/docs/packaging-an-application/test-procs/,/docs/native/packaging-an-application/test-procs/,/docs/swarm/packaging-an-application/test-procs/]
---

{{<legacynotice>}}

The `test_proc` property in the configuration section of the YAML gives you the ability to easily test the validity of the unsaved configuration parameters entered by the end-user with minimal configuration.

Following is a detailed list of YAML properties of the `test_proc` object:

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| display_name | string | yes | The text to show in the button in the browser UI. |
| run_on_save | string or boolean | no | When true this test will run on saving the configuration. |
| timeout | int | no | Timeout in seconds, default 15 seconds, -1 denotes no timeout |
| command | string | yes | The command that will be run. See the list below for a list of [available commands](/docs/config-screen/test-procs/#commands). |
| arg_fields | []string | no | A list of config item names for which to pass values to the test procedure. |
| args | []string | no | A list of static arguments to pass to the test procedure. |
| when | string | no | Will determine if the test procedure is runnable (evaluated to a boolean value) |

{{< linked_headline "Arguments" >}}

There are two different argument properties of the `test_proc` object.

1. `arg_fields`: A list of configuration item names. When run, the item values will be passed to the command in order. This field only applies to test procedures that are a property of a configuration group. When a property of an item, the first argument will always be the item value.

2. `args`: A list of static arguments that will be passed to the command. These will be appended after any `arg_fields` values.

{{< linked_headline "Commands" >}}

For additional functionality, fully customizable commands can be achieved through the use of [Programmable Test Procedures](/docs/config-screen/programmable-test-procs/).

See below for a list of test commands that are built into the Replicated Platform:

### Resolve Host

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

### GitHub App Auth

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

### AWS Auth

`aws_auth` – Test whether or not the supplied AWS key and secret are valid. Applies to a
group of items. This command expects 3 arguments. These arguments come from values entered
by your customer into the config items within this group. The arguments, in expected order:

1. Access key ID.
1. Secret access key.
1. AWS service.  Valid values are `ec2`, `s3`, and `sqs`.  Credentials will be validated using `DescribeRegions`, `ListAllMyBuckets`, and `ListQueues` operations respectively.
1. (Optional) Custom S3 endpoint. `s3` AWS service must be set. Allows for specifying a custom endpoint if you are using an S3-compatible service like Minio.
1. (Optional) AWS Region (`us-east-1` by default).

```yaml
config:
- name: aws
  title: AWS Integration
  description: Provide your AWS Credentials
  test_proc:
    display_name: Test AWS Auth
    command: aws_auth
    timeout: 5
    arg_fields:
      - aws_access_key_id
      - aws_secret_access_key
      - aws_service
      - aws_custom_endpoint
      - aws_region
  items:
    - name: aws_access_key_id
      title: AWS Access Key ID
      type: password
      desciption: Will use instance profiles if possible when left blank.
    - name: aws_secret_access_key
      title: AWS Secret Access Key
      type: password
      desciption: Will use instance profiles if possible when left blank.
    - name: aws_service
      title: AWS Service
      type: select_one
      items:
        - name: s3
          title: S3
        - name: ec2
          title: EC2
        - name: sqs
          title: SQS
    - name: aws_custom_endpoint
      title: AWS Custom Endpoint
      type: text
    - name: aws_region
      title: AWS Region
      type: text
      default: us-east-1
```

### Certificate Verification

`certificate_verify` – Test whether or not the supplied x509 certificate is valid. Optionally
validate the key pair, hostname and CA certificate. Applies to a group of items. This command expects the
certificate as the first argument with additional optional arguments private key and hostname. If a CA cert is not
supplied and the certificate issuer is the same as the subject of the supplied certificate, it is treated as a
self-signed certificate. These arguments come from values entered by your customer into the config items within this
group. The arguments, in expected order:

1. x509 certificate
1. Private key (optional)
1. Hostname (optional)
1. x509 CA certificate (optional)

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
    - ca_cert
  items:
  - name: hostname
```

### SMTP Auth

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
smtp.gmail.com:587 for the test procedure to validate correctly. A type of "None" will only
ensure the socket is available.**

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

### File Exists

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

### Regex Match

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

### LDAP Auth

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

### JSON Validation

`validate_json` - Tests for valid JSON.  The `validate_json` test procedure takes a single argument which is the item name that contains the JSON to test.

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
