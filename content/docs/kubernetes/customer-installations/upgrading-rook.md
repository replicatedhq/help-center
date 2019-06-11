---
date: "2019-06-10T12:00:00Z"
title: "Upgrading Rook Ceph"
description: "Notes on manually upgrading the Rook Operator and Ceph"
weight: "2714"
categories: [ "Manage Customer Installation" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

# Upgrading Rook Ceph

Previous versions of Replicated were bundled with [Rook version 0.8](https://rook.github.io/docs/rook/v0.8/).
When upgrading Replicated the Rook Operator will not be upgraded to the current version.

Rook supports upgrading from one minor version to the next. Rook must first be upgraded from a 0.8 to a 0.9 release before upgrading to a 1.0 release.

## Upgrading from release 0.8 to 0.9

Manual steps for upgrading from a 0.8 release to a 0.9 release can be followed using [this guide](https://rook.github.io/docs/rook/v0.9/ceph-upgrade.html) with some [amendments](#amendments-v0-9) below.

*NOTE: This guide was created as of release [0.9.3](https://github.com/rook/rook/blob/v0.9.3/Documentation/ceph-upgrade.md).*

### Amendments (v0.9)

1. The 0.9.3 release can be downloaded with the link [https://github.com/rook/rook/archive/v0.9.3.tar.gz](https://github.com/rook/rook/archive/v0.9.3.tar.gz).
1. In the "Upgrade Process" [2. Update modifed/added resources](https://rook.github.io/docs/rook/v0.9/ceph-upgrade.html#2-update-modifedadded-resources) section there are no pod security policies enabled.
1. In the "Upgrade Process" [8. Update optional components](https://rook.github.io/docs/rook/v0.9/ceph-upgrade.html#8-update-optional-components) section there are no ancillary components to be updated.
1. The [Ceph Daemon Upgrades](https://rook.github.io/docs/rook/v0.9/ceph-upgrade.html#ceph-daemon-upgrades) section can be skipped as we will upgrade to Nautilus directly following the upgrade from [release 0.9 to 1.0](#upgrading-from-release-0-9-to-1-0).

## Upgrading from release 0.9 to 1.0

Manual steps for upgrading from a 0.9 release to a 1.0 release can be followed using [this guide](https://rook.github.io/docs/rook/v1.0/ceph-upgrade.html) with some [amendments](#amendments-v1-0) below.

*NOTE: This guide was created as of release [1.0.2](https://github.com/rook/rook/blob/v1.0.2/Documentation/ceph-upgrade.md).*

### Amendments (v1.0)

1. The 1.0.2 release can be downloaded with the link [https://github.com/rook/rook/archive/v1.0.2.tar.gz](https://github.com/rook/rook/archive/v1.0.2.tar.gz).
1. In "Upgrade Process" [4. Wait for the upgrade to complete](https://rook.github.io/docs/rook/v1.0/ceph-upgrade.html#4-wait-for-the-upgrade-to-complete) the tools pod will not get the `rook-version` label.
1. In "Upgrade Process" [6. Update the Mon Ports](https://rook.github.io/docs/rook/v1.0/ceph-upgrade.html#6-update-the-mon-ports) you must follow steps 1-5 for each mon waiting the full 5+ minutes for each mon failover before moving on to the next. The mons will follow the pattern `rook-ceph-mon0` rather than `rook-ceph-mon-a` as stated in the guide.
1. The [Ceph Version Upgrades](https://rook.github.io/docs/rook/v1.0/ceph-upgrade.html#ceph-version-upgrades) section must be completed. Replicated recommends the Ceph version `NEW_CEPH_IMAGE='ceph/ceph:v14.2.0-20190410'`.

## Ceph Dashboard

In order to get the new Ceph dashboard running with Rook 1.0 the following steps must be taken.

1. Edit the `rook-ceph` CephCluster to enable the Ceph dashboard.
    1. Edit the `rook-ceph` CephCluster:

        ```
        kubectl -n $ROOK_NAMESPACE edit CephCluster rook-ceph
        ```
    1. Add the following to the spec:

        ```
          dashboard:
            enabled: true
            urlPrefix: /ceph
            port: 7000
            ssl: false
        ```
1. Set the `CEPH_DASHBOARD_USER` and `CEPH_DASHBOARD_PASSWORD` environment variables in the `replicated-ui` container of the `replicated` deployment.

    1. To obtain the `CEPH_DASHBOARD_PASSWORD` run the following:

        ```
        kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode
        ```
    1. Edit the `replicated` deployment

        ```
        kubectl edit deploy replicated
        ```
    1. Add the following to the `replicated-ui` container `env`.

        ```
                - name: CEPH_DASHBOARD_USER
                  value: admin
                - name: CEPH_DASHBOARD_PASSWORD
                  value: "<the password>"
        ```
