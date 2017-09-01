+++
date = "2017-08-29T00:00:00Z"
lastmod = "2017-08-29T00:00:00Z"
title = "Internal Server Error on Airgap Install"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

When installing Replicated using the airgap method and you recieve the error "Invalid package archive" while selecting local package and the license could mean that the path or airgap file are incorrect.

```shell
docker logs replicated-ui
WARNING 2016/08/24 19:56:27 airgap/airgap.go:144 Airgap package at /tmp/getelk.airgapllkk does not exist
ERROR 2016/08/24 19:56:27 premkit/log/gin.go:52 [GIN] 412 | 328.002094ms |  | POST    /v0.1/license/airgap
```

If the license being used isn't airgap enabled you can verify with the command below.

```shell
docker logs replicated-ui
ERROR 2016/08/24 19:56:27 premkit/log/gin.go:52 [GIN] 412 |  407.32268ms | 71.107.67.216:57035 | POST    /api/v1/license/airgap
ERROR 2016/08/24 19:58:41 premkit/log/gin.go:52 [GIN] 412 | 418.440822ms | 71.107.67.216:57035 | POST    /api/v1/license/airgap
ERROR 2016/08/24 20:01:17 premkit/log/gin.go:52 [GIN] 412 | 354.239945ms | 71.107.67.216:57035 | POST    /api/v1/license/airgap
ERROR 2016/08/24 20:02:43 handlers/license.go:60 Error: request returned Internal Server Error for API route and version https://replicated/v0.1/license/airgap, check if the server supports the requested API version
ERROR 2016/08/24 20:02:43 premkit/log/gin.go:52 [GIN] 500 | 28.784972584s | 71.107.67.216:57035 | POST    /api/v1/license/airgap
Published with GitBook · Last edit July 17th 20
```
