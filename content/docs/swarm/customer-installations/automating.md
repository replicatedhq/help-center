---
date: "2018-07-17T00:00:00Z"
title: "Automated Installations"
description: "How to automate installation of Replicated and an application"
weight: "710"
categories: [ "Managing Customer Installation" ]
index: ["docs/swarm", "docs"]
icon: "replicatedDockerSwarm"
aliases: []
gradient: "swarm"
---

Replicated has support for automated installation and configuration. This feature is built for bootstrapping new installations and not for managing existing installations.

These steps must be run before installing Replicated. Replicated will only check for these
values during initial installation.

## Configure Replicated Automatically

During installation, Replicated will create a config file in `/etc/replicated.conf`. If this file
exists, the installer will not overwrite it. To configure Replicated, create this file before installation,
using any or all of the following options:

```json
{
  "BypassPreflightChecks": true,
  "DaemonAuthenticationType": "password",
  "DaemonAuthenticationPassword": "this-is-a-secret",
  "ImportSettingsFrom": "/tmp/settings.conf",
  "LicenseFileLocation": "/tmp/license.rli",
  "LicenseBootstrapAirgapPackagePath": "/tmp/bundle.airgap",
  "LicenseBootstrapChannelID": "4331c5fa27ad4726644993e1bd234ded",
  "LogLevel": "debug",
  "ReleaseSequence": 123,
  "TlsBootstrapType": "server-path",
  "TlsBootstrapHostname": "server.company.com",
  "TlsBootstrapCert": "/etc/server.crt",
  "TlsBootstrapKey": "/etc/server.key"
}
```

These settings are explained in the following table:

| Setting | Acceptable Values | Description |
|---------|-------------------|-------------|
| BypassPreflightChecks	 | Boolean `true` or `false` | Allows application to start without preflight checks |
| DaemonAuthenticationType | `anonymous` or `password` | Replicated supports anonymous and password protected access. |
| DaemonAuthenticationPassword | Any `string` | If DaemonAuthenticationType is set to `password` this value is required to access the Replicated console. |
| DaemonToken | Any `string` | Authentication token used by operators for automating a cluster installation |
| ImportSettingsFrom | A file location as a `string` | If your application has any required config settings, you can supply custom values here. Replicated will read these and set them as if the user manually configured it. (see below) |
| LicenseFileLocation | A file location as a `string` | This should be set to the location of an installable .rli license file. Note that you should not enable activation on this license. |
| LicenseBootstrapAirgapPackagePath | A file location as a `string` | This should be set to the location of the airgap bundle path. When set, the automated install will proceed as an [airgapped installation](/docs/distributing-an-application/airgapped-installations/). Note that `LicenseFileLocation` must also be set. |
| LicenseBootstrapChannelID | A channel ID as a `string` | This property allows specifying the installation channel for [multi-channel licenses](/docs/kb/supporting-your-customers/multichannel-licenses/). |
| LogLevel | `['debug', 'info, 'error']` | If present, this will set the log level of the Replicated daemon. |
| ReleaseSequence | The `number` of an app release | Pins the application to a release available in the license's channel, but is overridden by pins made in the vendor console. See [Pinning the Release Sequence of an Application](https://help.replicated.com/community/t/pinning-the-release-sequence-of-an-application/66). |
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
  - name: many_files
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
 "many_files": {
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

## Additional Settings

Additional fields can be set in the `etc/replicated.conf` for
[using the cli to restore snapshots](/docs/snapshots/cli).
