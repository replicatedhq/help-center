+++
date = "2017-08-29T00:00:00Z"
lastmod = "2017-08-29T00:00:00Z"
title = "Internal Server Error on Online Install"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

Below is an example of the type of errors that are raised for these scenarios: Corrupted replicated license, transmission error uploading license, and mistakenly uploading a non-replicated license file.

```shell
docker logs replicated
ERROR 2016/08/26 21:44:54 marketlicense/license.go:97 Failed to read license data:
ERROR 2016/08/26 21:44:54 premkit/log/gin.go:52 [GIN] 500 | 343.141295ms |  | POST    /v0.1/license
ERROR 2016/08/26 21:45:29 marketlicense/license.go:90 License data appears to be invalid. Not proceeding with installation.
ERROR 2016/08/26 21:45:29 premkit/log/gin.go:52 [GIN] 500 |  65.656228ms |  | POST    /v0.1/license
ERROR 2016/08/26 21:46:04 marketlicense/license.go:97 Failed to read license data:
ERROR 2016/08/26 21:46:04 premkit/log/gin.go:52 [GIN] 500 |  66.952726ms |  | POST    /v0.1/license
ERROR 2016/08/26 21:47:05 marketlicense/license.go:90 License data appears to be invalid. Not proceeding with installation.
ERROR 2016/08/26 21:47:05 premkit/log/gin.go:52 [GIN] 500 |  68.029836ms |  | POST    /v0.1/license
```
