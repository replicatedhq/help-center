---
date: "2018-08-22T04:02:20Z"
title: "Resource Names"
description: "A list of all available resource names for the Replicated Vendor RBAC policy."
weight: "2703"
categories: [ "Vendor RBAC" ]
index: "other"
---

| Resouce Name | Arguments |
|----|---|
| [platform/app/%s/delete](#platform-app-s-delete) | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/create` | None
| `platform/app/%s/read` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/branding/update` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/branding/delete` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/branding/read` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/externalregistry/create` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/externalregistry/%s/update` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [External Registry Name]()
| `platform/app/%s/externalregistry/%s/delete` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [External Registry Name]()
| `platform/app/%s/channel/create` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/channel/%s/archive` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [Channel ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/channel/%s/promote` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [Channel ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/channel/%s/update` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [Channel ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/channel/%s/releases/read` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [Channel ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/channel/%s/releases/update` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [Channel ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/channel/%s/read` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [Channel ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/license/create` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/license/%s/archive` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [License ID]()
| `platform/app/%s/license/%s/read` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [License ID]()
| `platform/app/%s/license/%s/update` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [License ID]()
| `platform/app/%s/license/%s/download` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [License ID]()
| `platform/app/%s/licensefields/create` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/licensefields/read` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/licensefields/update` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/licensefields/delete` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/release/create` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27)
| `platform/app/%s/release/%d/update` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [Sequence Number]()
| `platform/app/%s/release/%d/read` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [Sequence Number]()
| `platform/app/%s/release/%d/archive` | [App ID](https://help.replicated.com/community/t/finding-your-vendor-api-token-and-app-id/27) [Sequence Number]()
| `platform/team/member/%s/read` | [Member ID](...)
| `platform/team/member/invite` | None
| `platform/team/member/%s/delete` | [Member ID](...)
| `platform/team/member/%s/update` | [Member ID](...)
| `platform/team/token/%s/read` | [Token Name](...)
| `platform/team/token/create` | None
| `platform/team/token/%s/delete` | [Token Name](...)
| `team/auditlog/read` | None


#### platform/app/%s/delete
When allowed, the holder will be allowed to delete the application(s) specified.

### platform/app/create
When allowed, the holder will be allowed to create new applications.

### platform/app/%s/read
Grants the holder permission to view the application. Specifically, applications with read permission will be returned in the API call to [list applications](https://replicated-vendor-api.readme.io/v1.0/reference#listapps).

### platform/app/%s/branding/update
Grants the holder permission to create or update custom branding for he specified application(s). This grants the permission across all channels in the application, regardless of the permission to the specific channel.

### platform/app/%s/branding/delete
Grants the holder permission to remove custom branding from any channel in the specified application(s).

### platform/app/%s/branding/read

Grants the holder the ability to view the custom CSS for the application(s) specified.

### platform/app/%s/externalregistry/create

Grants the holder the ability to link a new external docker registry to the specified application(s).

### platform/app/%s/externalregistry/%s/update

Grants the holder the ability to edit the specified linked external docker registry in the specified application(s).

### platform/app/%s/externalregistry/%s/delete

Grants the holder the ability to delete the specified linked external docker registry in the specified application(s).

### platform/app/%s/channel/create

Grants the holder the ability to create a new channel in the specified application(s).

### platform/app/%s/channel/%s/archive

Grants the holder the ability the archive the specified channel(s) of the specified application(s).

### platform/app/%s/channel/%s/promote

Grants the holder the ability to promote a new release to the specified channel(s) of the specified application(s).

### platform/app/%s/channel/%s/update

Grants the holder permission to update the specified channel of the specified application(s).

### platform/app/%s/channel/%s/releases/read

Grants the holder permission to view the release history for the specified channel in the specified application(s).

### platform/app/%s/channel/%s/releases/update

Grants the holder permission to update the channel release in the channel specified of the application specified. This policy allows the holder to update the "Required"/"Optional" status, the release notes and the version number.

### platform/app/%s/channel/%s/read


### platform/app/%s/license/create

Grants the holder permission to create a new license in the specified application(s).

### platform/app/%s/license/%s/archive

Grants the holder permission to archive the specified license (by ID) in the specified application(s).

### platform/app/%s/license/%s/read

Grants the holder permission to view the license specified by ID. If this is denied, the licenses will not show up in search, CSV export or on the Vnedor Portal.

### platform/app/%s/license/%s/update

Grants the holder permission to edit the license specified (by ID) for the specified application(s).

### platform/app/%s/license/%s/download

Grants the holder permission to download the license file for the specified licenses (by ID) in the specified application(s).

### platform/app/%s/licensefields/create

Grants the holder permission to create new custom license fields in the specified application(s).

### platform/app/%s/licensefields/read

Grants the holder permission to read the license field information for the specified application(s).

### platform/app/%s/licensefields/update

Grants the holder poermission to update license fields in the specified application(s).

### platform/app/%s/licensefields/delete

Grants the holder permission to delete license fields from the specified application(s).

### platform/app/%s/release/create

Grants the holder permission to create a new release in the specified application(s).

### platform/app/%s/release/%d/update

Grants the holder permission to update the YAML saved in release sequence `%d` in the specified application(s). Once a release is promoted to a channel, it's not editable by anyone.

### platform/app/%s/release/%d/read

Grants the holder permission to read the YAML release sequence `%d` in the specified application(s).

### platform/app/%s/release/%d/archive

Grants the holder permission to archive release sequence `%d` in the specified application(s).

### platform/team/member/%s/read

Grants the holder permission to view the team member(s) information, specified by ID.

### platform/team/member/invite

Grants the holder permission to invite additional people to the team.

### platform/team/member/%s/delete

Grants the holder permission to delete the team member(s) specified by ID.

### platform/team/member/%s/update

Grants the holder permission to update the team member(s) specified by ID.

### platform/team/token/%s/read

Grants the holder permission to view the API token(s) specified by name.

### platform/team/token/create

Grants the holder permission to create new API tokens for the team.

### platform/team/token/%s/delete

Grants the holder permission to delete the token(s) identified by the names specified.

### team/auditlog/read

Grants the holder permission to view the audit log for the team.