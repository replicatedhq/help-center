+++
date = "2017-08-29T00:00:00Z"
lastmod = "2017-08-29T00:00:00Z"
title = "Airgap Restore Workaround"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

A workaround for airgapped installations that, after attempting to restore from snapshot, receive something similar to the following error in the dashboard:

`image registry.replicated.com/example/test:1.1.0 not found`

This is occurring because the snapshot process does not grab the remote images. We will need to manually load these missing images from the airgap file.

### 1. Copy the .airgap file to the restore server

### 2. Untar the contents of the airgap file into a temporary folder
```shell
mkdir airgap
cd airgap
tar xfzv ../myairgap.airgap
```
### 3. Load each of the images into docker
```shell
find . -type f -exec docker load -i {} \;
```
### 4. Review the image names that were loaded
```shell
docker images
```
### 5. Re-name any images that are mis-named by re-tagging the image
```shell
docker tag <DOCKER-IMAGE-ID>  <DOCKER-IMAGE-NAME>:<DOCKER-IMAGE-TAG>
```