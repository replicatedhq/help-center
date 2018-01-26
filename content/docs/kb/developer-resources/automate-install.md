---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-03T00:00:00Z"
title: "Automated Installs"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Installing Replicated", "Application YAML"]
---

Replicated has support for automated installation and configuration of your app.
This feature is built to configure a new installation, not to manage existing installations.

These steps must be run before installing Replicated. The Replicated daemon only checks for these
values during startup, and only the first time it is started.

## Configure Replicated Automatically

To configure Replicated, create the file `/etc/replicated.conf` using any or all
of the following options.

```json
{
  "BypassPreflightChecks": true,
  "DaemonAuthenticationType": "anonymous",
  "DaemonToken": "FXgbTJIdQ8amAktHKilu3V",
  "ImportSettingsFrom": "/tmp/settings.conf",
  "LogLevel": "debug",
  "LicenseFileLocation": "/tmp/license.rli",
  "LicenseBootstrapAirgapPackagePath": "/tmp/app.airgap",
  "LicenseBootstrapChannelID": "294c68d968deb06f911a63712016ab9a",
  "ReleaseSequence": 72,
  "TlsBootstrapType": "server-path",
  "TlsBootstrapHostname": "server.company.com",
  "TlsBootstrapCert": "/etc/server.crt",
  "TlsBootstrapKey": "/etc/server.key"
}
```

These settings are explained in the following table:

| Setting | Acceptable Values | Description |
|---------|-------------------|-------------|
| BypassPreflightChecks	 | Boolean `true` or `false` | Skips all preflight checks |
| DaemonAuthenticationType | `anonymous` or `password` | For test automation Replicated supports anonymous and password protected access. |
| DaemonAuthenticationPassword | Any `string` | If DaemonAuthenticationType is set to `password` this value is required to access the Replicated console. |
| DaemonToken | Any `string` | Authentication token used by operators for automating a cluster installation |
| ImportSettingsFrom | A file location as a `string` | If your application has any required config settings, you can supply custom values here. Replicated will read these and set them as if the user manually configured it. (see below) |
| LogLevel | `['debug', 'info', 'error']` | If present, this will set the log level of the Replicated daemon. |
| LicenseFileLocation | A file location as a `string` | This should be set to the location of an installable .rli license file. Note that you should not enable activation on this license. |
| LicenseBootstrapAirgapPackagePath | A file location as a `string` | This should be set to the location of a downloaded airgap bundle for an app release. |
| LicenseBootstrapChannelID | A channel's `string` id | Use this param to select a channel for multi-channel licenses. Not applicable to airgap. |
| ReleaseSequence | The `number` of an app release | Pins the application to a release available in the license's channel. Without this parameter the latest release from the license's channel will be installed. Not applicable to airgap. |
| TlsBootstrapType | `['server-path', 'self-signed']` | The type of TLS cert the Replicated UI will run with. Use self-signed for a fully automated setup, use server-path to provide a static cert and key to bootstrap the console with. |
| TlsBootstrapHostname | Any `string` | The hostname to use for the Replicated-UI :8800 console |
| TlsBootstrapCert | A file location as a `string` | If TlsBootstrapType is set to server-path, this value should be present and set to the location of a PEM encoded certificate file. |
| TlsBootstrapKey | A file location as a `string` | If TlsBootstrapType is set to server-path, this value should be present and set to the location of a PEM encoded key file. |

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
