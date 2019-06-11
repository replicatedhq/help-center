---
date: "2019-02-14T04:02:20Z"
title: "Migrating from Native Scheduler Installations"
description: "Instructions for migrating native installations to Kubernetes"
keywords: "installing, removing, migrating"
weight: "2716"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
aliases: [docs/distributing-an-application/installing-on-kubernetes]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

Replicated 2.33+ provides a Kubernetes migration script that can be used to import compatible apps from installations running with the native scheduler.

The following data will be included in the migration:

* [Config items](#config-items)
* Console auth configuration
* [Snapshot settings](#snapshots)
* [TLS certificates](https://help.replicated.com/community/t/updating-tls-certificates-for-on-prem-admin/74)
* [Proxy settings](/docs/kubernetes/customer-installations/proxies/)
* License update settings
* App update settings
* Audit log

The migration will not include:

* Application data from container volumes
* Statsd metrics
* Snapshot history
* Preflight check results
* Release history

Using the script requires a customer have a multi-app license with exactly one Kubernetes app.
The script will install the latest release from the license's default channel for the Kubernetes app.

```shell
curl -sSL https://get.replicated.com/kubernetes-migrate | sudo bash
```

Or if your Kubernetes app is pinned to a specific version of Replicated use the channel install script:

```shell
curl -sSL https://get.replicated.com/appslug/appchannel/kubernetes-migrate | sudo bash
```

This script will delegate to the [kubernetes-init](/docs/kubernetes/customer-installations/installing/) script to bring up a Kubernetes installation then import settings from the native installation and install the Kubernetes app.

{{< linked_headline "Flags" >}}

All the flags passed to the migration script will be forwarded to the `kubernetes-init` script except the following:

| Flag                             | Description                              |
| -------------------------------- | ---------------------------------------- |
| airgap-package-path              | Path to the Kubernetes app airgap bundle |
| airgap-license-path              | Path to a license for the Kubernetes app |

The migration script may generate the following flags for the init script based on values discovered from the native installation: `private-address`, `log-level`, `http-proxy`, `no-proxy`, `additional-no-proxy`

{{< linked_headline "Airgap" >}}

```shell
curl -O http://s3.amazonaws.com/replicated-airgap-work/replicated__docker__kubernetes.tar.gz
tar xvf replicated__docker__kubernetes.tar.gz
cat kubernetes-migrate.sh | sudo bash -s airgap airgap-package-path=/opt/k8s/app.airgap airgap-license-path=/opt/k8s/license.rli
```

The Kubernetes airgap app package must not be in the same directory as the native app airgap package.

{{< linked_headline "Clusters" >}}

Worker nodes in your native cluster will not be automatically joined to the Kubernetes cluster.
You will need to run the [kubernetes-node-join script](/docs/kubernetes/customer-installations/add-nodes/) on each node separately.
That script will also uninstall any native components found on the node.

{{< linked_headline "Config Items" >}}

All [config items](/docs/config-screen/config-yaml/) with the same name in both apps will be migrated.
Items do not need to belong to the same group in order to be migrated.
Config items with `data_cmd`, `value_cmd`, or `default_cmd` fields will keep any `data`, `value`, and `default` settings resulting from [config commands](/docs/config-screen/commands/) run on the native installation.
Write once config items will remain locked.

{{< linked_headline "Snapshots" >}}

All console settings for [snapshots](/docs/snapshots/overview/) will be preserved, but a "k8s" path component will be added to isolate native snapshots from Kubernetes snapshots.

For example, if using local filesystem snapshots stored in the `/var/lib/replicated/snapshots` directory, the path will be changed to `/var/lib/replicated/snapshots/k8s` in the Kubernetes installation.
Likewise S3 bucket configurations will have the "k8s/" folder prepended to all object keys and SFTP remote directories will have a "k8s" directory appended.
Existing native snapshots will be preserved and the Kubernetes installation will start with an empty snapshot history.
Snapshots taken on an installation with the native scheduler cannot be used for restores on Kubernetes installations.
Multi-strategy snapshot settings will not be migrated.

{{< linked_headline "Activation" >}}

The migration script will detect if [activation is required](https://replicated.com/community/t/2-factor-authentication-for-customer-licenses/73) and automatically request a new activation code be sent to the activation email address on the license.
The script will prompt the user to enter the activation code before proceeding.

{{< linked_headline "Terms of Service" >}}

[Terms of service](/docs/native/packaging-an-application/overview/#terms) specified in your app yaml are only shown for fresh installs.
Users will not see the terms of service during a migration.
