---
date: "2016-07-03T04:02:20Z"
title: "Installing Replicated via AMI"
description: "Instructions for delivering a pre-built VM for a release"
keywords: "installing"
weight: "304"
categories: [ "Managing Customer Installation" ]
index: ["docs/native", "docs"]
aliases: [docs/distributing-an-application/installing-via-ami,/docs/native/packaging-an-application/installing-via-ami]
icon: "replicatedCircle"
---

At times, it can be desirable to deliver an a preconfigured, generic VM to allow customers a familiar installation path. While Replicated does not provide an official machine image, understanding which Replicated-specific files are needed - and which are not needed - is sufficient for delivering a pre-built AMI for a release

## Required images

Images listed in this section can be loaded from Replicated airgap bundles and have to be present on the primary node.

### Replicated images

All of the images below can be found in [replicated.tar.gz](/docs/distributing-an-application/airgapped-installations/#install-replicated) package.  If loading images manually, the `current` tag needs to be added manually as well.

|                                       |
| ------------------------------------- |
| quay.io/replicated/replicated:current |
| quay.io/replicated/replicated-ui:current |
| quay.io/replicated/replicated-operator:current |
| registry.replicated.com/library/support-bundle:v0.19.2 |
| registry.replicated.com/library/statsd-graphite:0.3.5 |
| registry.replicated.com/library/retraced:1.2.2 |
| registry.replicated.com/library/cmd:1.2.4 |
| registry.replicated.com/library/retraced-nsq:v1.0.0-compat-20180619 |
| registry.replicated.com/library/retraced-postgres:10.3-20180619 |
| registry.replicated.com/library/premkit:1.2.0 |

### Application images

Application images must be tagged `<PRIVATE_ADDRESS>:9874/<IMAGE_NAME>:<VERSION>`.   In this string:

 - `PRIVATE_ADDRESS` is the host IP that Replicated is configured to use as the PRIVATE_ADDRESS.
 - `IMAGE_NAME` depends on the original registry URL of the image.
 - `VERSION` is always the same as in the original image.

This image list can be obtained by running `docker ps -a` command on a host where the same version of the application has been installed.

## Replicated files
Replicated stores configuration in several locations:

### /var/lib/replicated-operator/replicated-operator.conf

This file contains Replicated Operator configuration.  Typical contents look like this:

```json
{"OperatorID":"c2b4118080d64cd070a1dd08cf19a9a8"}
```

Note that `OperatorID` has to be different on each node.  This can be any string.

### /etc/default/replicated

```bash
RELEASE_CHANNEL=stable
PRIVATE_ADDRESS=10.128.0.11
REPLICATED_OPTS=" -e DAEMON_TOKEN=L4ub0ElG8cVMonnHC4Id2 -e LOG_LEVEL=info -e NODENAME=host001.internal"
```

### /etc/default/replicated-operator

```bash
RELEASE_CHANNEL=stable
DAEMON_ENDPOINT=[10.128.0.11]:9879
DAEMON_TOKEN=L4ub0ElG8cVMonnHC4Id2
DAEMON_HOST=[10.128.0.11]
PRIVATE_ADDRESS=10.128.0.11
REPLICATED_OPERATOR_OPTS=" -e PUBLIC_ADDRESS=35.202.38.158 -e TAGS=local -e LOG_LEVEL=info -e NODENAME=host001.internal"
```

Note that `PRIVATE_ADDRESS` in this file will be different on each node.

## System services

Replicated containers are controlled by system service manager.  This requires three configuration files.

Note that in all of these files:

1. `PRIVATE_ADDRESS`, `RELEASE_CHANNEL`, and `REPLICATED_OPTS` come from the `/etc/defaults` files described above.
1. `User=1017` is the Replicated user created by the install script.
1. `Group=999` is the Replicated group created by the install script.

### /etc/systemd/system/replicated.service

```bash
[Unit]
Description=Replicated Service
After=docker.service
Requires=docker.service

[Service]
PermissionsStartOnly=true
TimeoutStartSec=0
KillMode=none
EnvironmentFile=/etc/default/replicated
User=1017
Group=999
ExecStartPre=-/usr/bin/docker rm -f replicated
ExecStartPre=/bin/mkdir -p /var/run/replicated /var/lib/replicated /var/lib/replicated/statsd
ExecStartPre=/bin/chown -R 1017:999 /var/run/replicated /var/lib/replicated
ExecStartPre=-/bin/chmod -R 755 /var/lib/replicated/tmp
ExecStart=/usr/bin/docker run --name=replicated \
    -p 9874-9879:9874-9879/tcp \
    -u 1017:999 \
    -v /var/lib/replicated:/var/lib/replicated \
    -v /var/run/docker.sock:/host/var/run/docker.sock \
    -v /proc:/host/proc:ro \
    -v /etc:/host/etc:ro \
    -v /etc/os-release:/host/etc/os-release:ro \
    -v /etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt \
    -v /var/run/replicated:/var/run/replicated \
    --security-opt label=type:spc_t \
    -e LOCAL_ADDRESS=${PRIVATE_ADDRESS} \
    -e RELEASE_CHANNEL=${RELEASE_CHANNEL} \
    $REPLICATED_OPTS \
    quay.io/replicated/replicated:current
ExecStop=/usr/bin/docker stop replicated
Restart=on-failure
RestartSec=7

[Install]
WantedBy=multi-user.target
```

### :/etc/systemd/system/replicated-operator.service

```bash
[Unit]
Description=Replicated Operator Service
After=docker.service
Requires=docker.service

[Service]
PermissionsStartOnly=true
TimeoutStartSec=0
KillMode=none
EnvironmentFile=/etc/default/replicated-operator
User=1017
Group=999
ExecStartPre=-/usr/bin/docker rm -f replicated-operator
ExecStartPre=/bin/mkdir -p /var/run/replicated-operator /var/lib/replicated-operator
ExecStartPre=/bin/chown -R 1017:999 /var/run/replicated-operator /var/lib/replicated-operator
ExecStart=/usr/bin/docker run --name=replicated-operator \
    -u 1017:999 \
    -v /var/lib/replicated-operator:/var/lib/replicated-operator \
    -v /var/run/replicated-operator:/var/run/replicated-operator \
    -v /var/run/docker.sock:/host/var/run/docker.sock \
    -v /proc:/host/proc:ro \
    -v /etc:/host/etc:ro \
    -v /etc/os-release:/host/etc/os-release:ro \
    --security-opt label=type:spc_t \
    -e DAEMON_ENDPOINT=${DAEMON_ENDPOINT} \
    -e DAEMON_TOKEN=${DAEMON_TOKEN} \
    -e NO_PROXY=${DAEMON_HOST} \
    -e PRIVATE_ADDRESS=${PRIVATE_ADDRESS} \
    $REPLICATED_OPERATOR_OPTS \
    quay.io/replicated/replicated-operator:current
ExecStop=/usr/bin/docker stop replicated-operator
Restart=on-failure
RestartSec=7

[Install]
WantedBy=multi-user.target
```

### /etc/systemd/system/replicated-ui.service

```bash
[Unit]
Description=Replicated Service
After=docker.service
Requires=docker.service

[Service]
PermissionsStartOnly=true
TimeoutStartSec=0
KillMode=none
EnvironmentFile=/etc/default/replicated
User=1017
Group=999
ExecStartPre=-/usr/bin/docker rm -f replicated-ui
ExecStartPre=/bin/mkdir -p /var/run/replicated
ExecStartPre=/bin/chown -R 1017:999 /var/run/replicated
ExecStart=/usr/bin/docker run --name=replicated-ui \
    -p 8800:8800/tcp \
    -u 1017:999 \
    -v /var/run/replicated:/var/run/replicated \
    --security-opt label=type:spc_t \
    $REPLICATED_UI_OPTS \
    quay.io/replicated/replicated-ui:current
ExecStop=/usr/bin/docker stop replicated-ui
Restart=on-failure
RestartSec=7

[Install]
WantedBy=multi-user.target
```
