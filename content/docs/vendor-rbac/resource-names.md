---
date: "2018-08-22T04:02:20Z"
title: "Resource Names"
description: "A list of all available resource names for the Replicated Vendor RBAC policy."
weight: "2703"
categories: [ "Vendor RBAC" ]
index: "other"
---

| Resouce Name |
|----|
| [platform/app/:appId/delete](#platform-app-appid-delete) |
| [platform/app/create](#platform-app-create) |
| [platform/app/[:appId]/read](#platform-app-appid-read) |
| [platform/app/[:appId]/branding/update](#platform-app-appid-branding-update) |
| [platform/app/[:appId]/branding/delete](#platform-app-appid-branding-delete) |
| [platform/app/[:appId]/branding/read](#platform-app-appid-branding-read) |
| [platform/app/[:appId]/externalregistry/create](#platform-app-appid-externalregistry-create) |
| [platform/app/[:appId]/externalregistry/[:registryName]/update](#platform-app-appid-externalregistry-registryname-update) |
| [platform/app/[:appId]/externalregistry/[:registryName]/delete](#platform-app-appid-externalregistry-registryname-delete) |
| [platform/app/[:appId]/channel/create](#platform-app-appid-channel-create) |
| [platform/app/[:appId]/channel/[:channelId]/archive](#platfomr-app-appid-channel-channelid-archive) |
| [platform/app/[:appId]/channel/[:channelId]/promote](#platform-app-appid-channel-channelid-promote) |
| [platform/app/[:appId]/channel/[:channelId]/update](#platform-app-appid-channel-channelid-update ) |
| [platform/app/[:appId]/channel/[:channelId]/releases/read](#platform-app-appid-channel-channelid-releases-read) |
| [platform/app/[:appId]/channel/[:channelId]/releases/update](#platform-app-appid-channel-channelid-releases-update) |
| [platform/app/[:appId]/channel/[:channelId]/read](#platform-app-appid-channel-channelid-read) |
| [platform/app/[:appId]/license/create](#platform-app-appid-license.create) |
| [platform/app/[:appId]/license/[:licenseId]/archive](#platform-app-appid-license-licenseid-archive) |
| [platform/app/[:appId]/license/[:licenseId]/unarchive](#platform-app-appid-license-licenseid-unarchive) |
| [platform/app/[:appId]/license/[:licenseId]/read](#platform-app-appid-license-licenseid-read) |
| [platform/app/[:appId]/license/[:licenseId]/update](#platform-app-appid-license-licenseid-update) |
| [platform/app/[:appId]/license/[:licenseId]/download](#platform-app-appid-license-licenseid-download) |
| [platform/app/[:appId]/licensefields/create](#platform-app-appid-licensefields-create) |
| [platform/app/[:appId]/licensefields/read](#platform-app-appid-licensefields-read) |
| [platform/app/[:appId]/licensefields/update](#platform-app-appid-licensefields-update) |
| [platform/app/[:appId]/licensefields/delete](#platform-app-appid-licensefields-delete) |
| [platform/app/[:appId]/release/create](#platform-app-appid-release-create) |
| [platform/app/[:appId]/release/[:sequence]/update](#platform-app-appid-release-sequence-update) |
| [platform/app/[:appId]/release/[:sequence]/read](#platform-app-appid-release-sequence-read) |
| [platform/app/[:appId]/release/[:sequence]/archive](#platform-app-appid-release-sequence-archive) |
| [platform/team/member/[:memberId]/read](#platform-team-member-memberid-read) |
| [platform/team/member/invite](#platform-team-member-invite) |
| [platform/team/member/[:memberId]/delete](#platform-team-member-memberid-delete) |
| [platform/team/member/[:memberId]/update](#platform-team-member-memberid-update) |
| [platform/team/token/[:tokenName]/read](#platform-team-token-tokenname-read) |
| [platform/team/token/create](#platform-team-token-create) |
| [platform/team/token/[:tokenName]/delete](#platform-team-token-tokenname-delete) |
| [team/auditlog/read](#team-auditlog-read) |


#### platform/app/[:appId]/delete
When allowed, the holder will be allowed to delete the application(s) specified.

### platform/app/create
When allowed, the holder will be allowed to create new applications.

### platform/app/[:appId]/read
Grants the holder permission to view the application. Specifically, applications with read permission will be returned in the API call to [list applications](https://replicated-vendor-api.readme.io/v1.0/reference#listapps).

### platform/app/[:appId]/branding/update
Grants the holder permission to create or update custom branding for he specified application(s). This grants the permission across all channels in the application, regardless of the permission to the specific channel.

### platform/app/[:appId]/branding/delete
Grants the holder permission to remove custom branding from any channel in the specified application(s).

### platform/app/[:appId]/branding/read

Grants the holder the ability to view the custom CSS for the application(s) specified.

### platform/app/[:appId]/externalregistry/create

Grants the holder the ability to link a new external docker registry to the specified application(s).

### platform/app/[:appId]/externalregistry/[:registryName]/update

Grants the holder the ability to edit the specified linked external docker registry in the specified application(s).

### platform/app/[:appId]/externalregistry/[:registryName]/delete

Grants the holder the ability to delete the specified linked external docker registry in the specified application(s).

### platform/app/[:appId]/channel/create

Grants the holder the ability to create a new channel in the specified application(s).

### platform/app/[:appId]/channel/[:sequence]/archive

Grants the holder the ability the archive the specified channel(s) of the specified application(s).

### platform/app/[:appId]/channel/[:sequence]/promote

Grants the holder the ability to promote a new release to the specified channel(s) of the specified application(s).

### platform/app/[:appId]/channel/[:sequence]/update

Grants the holder permission to update the specified channel of the specified application(s).

### platform/app/[:appId]/channel/[:sequence]/releases/read

Grants the holder permission to view the release history for the specified channel in the specified application(s).

### platform/app/[:appId]/channel/[:sequence]/releases/update

Grants the holder permission to update the channel release in the channel specified of the application specified. This policy allows the holder to update the "Required"/"Optional" status, the release notes and the version number.

### platform/app/[:appId]/channel/[:channelId]/read


### platform/app/[:appId]/license/create

Grants the holder permission to create a new license in the specified application(s).

### platform/app/[:appId]/license/[:licenseId]/archive

Grants the holder permission to archive the specified license (by ID) in the specified application(s).

### platform/app/[:appId]/license/[:licenseId]/unarchive

Grants the holder permissions to unarchive the specified license (by ID) in the specified application(s).

### platform/app/[:appId]/license/[:licenseId]/read

Grants the holder permission to view the license specified by ID. If this is denied, the licenses will not show up in search, CSV export or on the Vnedor Portal.

### platform/app/[:appId]/license/[:licenseId]/update

Grants the holder permission to edit the license specified (by ID) for the specified application(s).

### platform/app/[:appId]/license/[:licenseId]/download

Grants the holder permission to download the license file for the specified licenses (by ID) in the specified application(s).

### platform/app/[:appId]/licensefields/create

Grants the holder permission to create new custom license fields in the specified application(s).

### platform/app/[:appId]/licensefields/read

Grants the holder permission to read the license field information for the specified application(s).

### platform/app/[:appId]/licensefields/update

Grants the holder poermission to update license fields in the specified application(s).

### platform/app/[:appId]/licensefields/delete

Grants the holder permission to delete license fields from the specified application(s).

### platform/app/[:appId]/release/create

Grants the holder permission to create a new release in the specified application(s).

### platform/app/[:appId]/release/[:sequence]/update

Grants the holder permission to update the YAML saved in release sequence `[:sequence]` in the specified application(s). Once a release is promoted to a channel, it's not editable by anyone.

### platform/app/[:appId]/release/[:sequence]/read

Grants the holder permission to read the YAML release sequence `[:sequence]` in the specified application(s).

### platform/app/[:appId]/release/[:sequence]/archive

Grants the holder permission to archive release sequence `[:sequence]` in the specified application(s).

### platform/team/member/[:memberId]/read

Grants the holder permission to view the team member(s) information, specified by ID.

### platform/team/member/invite

Grants the holder permission to invite additional people to the team.

### platform/team/member/[:memberId]/delete

Grants the holder permission to delete the team member(s) specified by ID.

### platform/team/member/[:memberId]/update

Grants the holder permission to update the team member(s) specified by ID.

### platform/team/token/[:tokenName]/read

Grants the holder permission to view the API token(s) specified by name.

### platform/team/token/create

Grants the holder permission to create new API tokens for the team.

### platform/team/token/[:tokenName]/delete

Grants the holder permission to delete the token(s) identified by the names specified.

### team/auditlog/read

Grants the holder permission to view the audit log for the team.