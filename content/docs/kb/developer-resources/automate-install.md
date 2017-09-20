---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-03T00:00:00Z"
title: "Automate Install for Testing"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Installing Replicated", "Application YAML"]
---

Replicated has support for automated installation and configuration to facilitate integration
testing. This feature is built to configure a new installation and prepare it to run a test
suite and not to managing existing installations.

These steps must be run before installing Replicated. The Replicated daemon only checks for these
values during startup, and only the first time it is started.

## Configure Replicated Automatically

During installation, Replicated will create a config file in `/etc/replicated.conf`. If this file
exists, the installer will not overwrite it. To configure Replicated, create this file using any
or all of the following options:

```json
{
  "DaemonAuthenticationType": "anonymous",
  "TlsBootstrapType": "server-path",
  "TlsBootstrapHostname": "server.company.com",
  "TlsBootstrapCert": "/etc/server.crt",
  "TlsBootstrapKey": "/etc/server.key",
  "LogLevel": "debug",
  "Channel": "stable",
  "LicenseFileLocation": "/tmp/license.rli",
  "ImportSettingsFrom": "/tmp/settings.conf",
  "BypassPreflightChecks": true
}
```

These settings are explained in the following table:

| Setting | Acceptable Values | Description |
|---------|-------------------|-------------|
| DaemonAuthenticationType | `anonymous` or `password` | For test automation Replicated supports anonymous and password protected access. |
| DaemonAuthenticationPassword | Any `string` | If DaemonAuthenticationType is set to `password` this value is required to access the Replicated console. |
| DaemonToken | Any `string` | Authentication token used by operators for automating a cluster installation |
| TlsBootstrapType | `['server-path', 'self-signed']` | The type of TLS cert the Replicated UI will run with. Use self-signed for a fully automated setup, use server-path to provide a static cert and key to bootstrap the console with. |
| TlsBootstrapHostname | Any `string` | The hostname to use for the Replicated-UI :8800 console |
| TlsBootstrapCert | A file location as a `string` | If TlsBootstrapType is set to server-path, this value should be present and set to the location of a PEM encoded certificate file. |
| TlsBootstrapKey | A file location as a `string` | If TlsBootstrapType is set to server-path, this value should be present and set to the location of a PEM encoded key file. |
| LogLevel | `['debug', 'info, 'error']` | If present, this will set the log level of the Replicated daemon. |
| Channel | `['stable', 'beta']` | The release channel you are using to install Replicated from. This is the Replicated channel, not the app channel. |
| LicenseFileLocation | A file location as a `string` | This should be set to the location of an installable .rli license file. Note that you should not enable activation on this license. |
| ImportSettingsFrom | A file location as a `string` | If your application has any required config settings, you can supply custom values here. Replicated will read these and set them as if the user manually configured it. (see below) |
| BypassPreflightChecks	 | Boolean `true` or `false` | Skips preflight checks |

## Configure App Settings Automatically

When your application has a Settings page, you can configure required options automatically by setting
the `ImportSettingsFrom` field in `/etc/replicated.conf`. This file is in JSON format and uses the
`config_item` names from the YAML as keys. For example, if your YAML contained the following config section:

```yaml
config:
- name: general
  title: General Settings
  items:
  - name: hostname
    title: The hostname of this server.
    type: text
    required: true
  - name: port_number
    title: The port to listen on.
    type: text
    required: true
  - name: a_file
    title: Pick a file.
    type: file
  - name: a_boolean
    title: Yea or Nay
    type: bool
  - name: many_a_files
    title: Pick many files.
    multiple: true
```

You could then create the `settings.conf` in this format:

```json
{
 "hostname": {
   "value": "http://app.domain.com"
 },
 "port_number": {
   "value": "1123123"
 },
 "a_file": {
   "value": "/some/fake/filepath",
   "data": "<base64 encoded contents of the actual file>"
 },
 "a_boolean": {
   "value": "true"
 },
 "many_a_files": {
   "multi_value": [
     "/some/fake/file1",
     "/some/fake/file2"
   ],
   "multi_data": [
     "<base64 encoded contents of file1>",
     "<base64 encoded contents of file2>"
   ]
 }
}
```
