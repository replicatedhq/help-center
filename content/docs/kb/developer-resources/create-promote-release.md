---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Create and Promote a Release"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Replicated Vendor", "Application YAML", "API"]
---

One common use case of the Vendor API is to connect it into your CI/CD workflow and create new unstable releases
on Replicated whenever a new build is run. This is especially helpful when you pair it with the ability to
[script the installation of Replicated](/docs/kb/developer-resources/automate-install/) for automated testing.
This article will show you how to use the Vendor API to automatically create a new release and promote it to
the unstable channel.

## Prerequisites

You should already have an API Token from the vendor site, and you should know the target App ID and Channel ID.
For details on how to get the App ID and Channel ID programmatically, check out the
[Vendor API documentation](https://replicated-vendor-api.readme.io/v1.0/reference). These values will not change and should be supplied as static
values to your deployment script.

Next, you should have the YML that you want to promote. One common method to generate this is to store the YML with
template values indicating the image tags to use. When your build server creates a new Docker image, it’s easy to
generate a new YAML programmatically.

## Create a new release

First, we will create a [new release](https://replicated-vendor-api.readme.io/v1.0/reference#release) with the current YAML. This release will not be
connected to your Channel ID at all; we are simply creating a release in your app that can be promoted later. T
his can be done with a single POST:

```bash
curl -X POST \
     -H 'Authorization: <API_Token>' \
     -H 'Content-Type: application/json' \
     -d '{"source":"latest"}' \
     https://api.replicated.com/vendor/v1/app/<AppID>/release
```

Note, in the result, you will receive a JSON object that contains a key named `Sequence`. Save this value. This is
the unique ID for the release you are creating. It will be required in the next steps.

## Update the release

Next, we want to [put our new YML into this release](https://replicated-vendor-api.readme.io/v1.0/reference#release). This is accomplished with a single PUT:

```bash
curl -X PUT \
     -H 'Authorization: <API_Token>' \
     -H 'Content-Type: application/yaml' \
     -d <YAML CONTENTS> \
     https://api.replicated.com/vendor/v1/app/<AppID>/<Sequence>/raw
```

There will be a `204 No Content` status code returned if this is successful. If there are parsing or validation errors
in the YML, a detailed message will be returned.

## Promote the release

Finally, we want to [promote this release](https://replicated-vendor-api.readme.io/v1.0/reference#promotereleaseproperties-1) to the channel. This will make it immediately
available to any installation of a license from that channel. We recommend doing this for the Unstable or dev/test
channels only at this time. Promoting the release is a single POST:

```bash
curl -X POST \
     -H 'Authorization: <API_Token>' \
     -H 'Content-Type: application/json' \
     -d '{"channels":["<ChannelID>"],\
          "release_notes":"This is an auto generated release",\
          "label":"AUTO","required":false}' \
     https://api.replicated.com/vendor/v1/app/<AppID>/<Sequence>/promote
```
This release will be generated with static release notes and version label, but these fields can be edited manually
at any time, including when you promote to the beta channel.

## Test Your App YAML Changes

When creating new releases during an automated process we recommend testing your app YAML first. This will allow you to validate, and if there are errors during validation exit your build process prior to creating a new release sequence.

To validate your app YAML we use the same call as updating but with a dry_run flag. This will allow you find any errors without updating your application. On success the response will be HTTP 200 OK. If there is a problem with your app YAML the service will return a HTTP 400 response with a JSON payload indicating the error. A HTTP 403 response indicates that the sequence you're trying to update has already been promoted in which case you would create a new release and retry the dry run.

```bash
curl -X PUT \
     -H 'Authorization: <API_Token>' \
     -H 'Content-Type: application/yaml' \
     -d <YAML CONTENTS> \
     https://api.replicated.com/vendor/v1/app/<AppID>/<Seq>/raw?dry_run=1
```


## Next Steps

Once you have this integrated into your CI/CD process, the next step is to set up
[automated installation for testing](/docs/kb/developer-resources/automate-install/) and you will be close to
a fully automated on-prem deployment process.
