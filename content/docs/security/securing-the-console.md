---
date: "2020-03-14T00:00:00Z"
title: "Securing the Console"
description: "Best practices for securing the Replicated admin console"
weight: "1904"
categories: [ "Security" ]
index: "other"
---

{{< linked_headline "Network Access" >}}

The Replicated admin console server listens on 0.0.0.0:8800.
Only the administrators responsible for installing, troubleshooting, and updating an application require access to the admin console.
For most organizations this will be a smaller group of users than would require access to the application itself.
Avoid exposing port 8800 on a network accessible to users other than the application's administrators.

{{< linked_headline "Console Authentication" >}}

The console should be configured to use a password or LDAP for authentication.
Avoid selecting the anonymous option, which will disable authentication and allow access to all users on the network.

After installing Replicated there is a period in which access to the console is granted to any user.
This is not the same as selecting anonymous authentication because the functions available during this period are limited to:

1. Uploading TLS certificates for the console
1. Initial upload of a license
1. Configuring authentication for the console

{{< linked_headline "Resetting Authentication" >}}

Users with root access to the server where Replicated is running can reset the console's authentication with the [CLI](https://help.replicated.com/api/replicatedctl/replicatedctl_console-auth_reset/).
This command should never be run after an application is installed unless the console is on a trusted network.

In case of a forgotten password, use this command to change it without having to temporarily disable authentication.

```
echo '{"Password": {"Password": "<new password>"}}' | replicatedctl console-auth import
```
