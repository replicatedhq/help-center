---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Installation Script"
weight: "999999"
categories: [ "Knowledgebase" ]
index: "docs"
---

Today we released an enhanced installation script to allow your customers to more easily configure 
for proxy, Docker version requirements and interface selection. Each prompt is on a reasonable timer; 
if no selection is made the default is accepted and the installation proceeds.

## HTTP PROXY IDENTIFICATION
Prompted during 100% of installations:

```shell
Does this machine require a proxy to access the Internet? (y/N)
```

This will always accept the default answer after 20 seconds, if not supplied. The default is `N`, unless 
the environment variable (one of `http_proxy` | `https_proxy` | `HTTP_PROXY` | `HTTPS_PROXY`) is set, then the 
default is `Y`.

## DOCKER VERSION REQUIREMENT
If Docker is not installed or at the correct version, no prompt or action is visible.
If Docker is detected and older than the current supported version the following prompt is displayed:

```shell
This installer will upgrade your current version of Docker (1.8.2) to the minimum required version: 1.9.1
Do you want to allow this? (Y/n)
```

Selecting `Y` will upgrade Docker. Selecting `N` will exit the script with instructions indicating that 
you should upgrade your Docker installation. Making no selection will default to `Y` after 20 seconds.

If Docker is detected and newer than the currently supported version the following prompt is displayed and 
the installer is aborted:

```shell
The installed version of Docker (1.9.4) may not be compatible with this installer.
The recommended version is 1.9.1
Do you want to proceed anyway? (y/N)
```

## INTERFACE SELECTION
If the server is in EC2 or GCE with common configuration settings, no prompts will be visible. The Cloud Provider 
Metadata API will provide the private/public interfaces and the installation will continue.

If the server has `eth0` and only `eth0` (ipv4 assignment, excluding `docker0` and `lo` interfaces), it will be 
assumed and the installation will continue.

If the server has no eth0 or multiple valid interfaces found, a prompt similar to the following will be presented:

```shell
Analyzing network configuration...
The installer was unable to automatically detect the private IP address of this machine.
Please choose one of the following network interfaces:
[0] default: unspecified
[1] lo   	127.0.0.1
[2] eth0 	192.168.196.130
[3] eth1 	192.168.100.200
[4] docker0	172.17.42.1
```

Making no selection will default to `unspecified` after 60 seconds… for which Replicated will attempt to pick the best 
option.