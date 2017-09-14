---
date: "2017-09-14T00:00:00Z"
lastmod: "2017-09-14T00:00:00Z"
title: "How to Change the Log Level"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
---

The default log level in Replicated is `info`. Available Log Levels are `error`, `warn`, `info` and `debug`. To change the log level in Replicated you will need to edit Replicated's config files and then restart. Replicated's services are configured via the files `replicated` and `replicated-operator` which are located in `/etc/default` or `/etc/sysconfig` depending on your distribution. You will then need to modify the `REPLICATED_OPTS` and `REPLICATED_OPERATOR_OPTS` entries respectively so that `LOG_LEVEL` is set appropriately. Once you have made the changes and saved the files, you must then restart Replicated for your changes to take effect. You can find instructions on restarting Replicated [here](/docs/distributing-an-application/installing-via-script/#restarting-replicated).

Below is an example `/etc/default/replicated` configuration file with Replicated's log level set to debug:

```
RELEASE_CHANNEL=stable
PRIVATE_ADDRESS=10.128.0.8
SKIP_OPERATOR_INSTALL=0
REPLICATED_OPTS=" -e DAEMON_TOKEN=mrHgGWUlBdt1gmDTU7QU3d4xwCFA -e LOG_LEVEL=debug -e NODENAME=testing.replicated.internal"
REPLICATED_UI_OPTS=""
```
