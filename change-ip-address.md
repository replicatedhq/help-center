+++
date = "2017-08-29T00:00:00Z"
lastmod = "2017-08-29T00:00:00Z"
title = "Change IP Address"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

If the IP address which Replicated uses changes the application will no longer start up, here is how change the IP address to get Replicated working. There are two files on the filesystem responsbile for determing the IP address replicated should use. These files are named replicated and replicated-operator and on RHEL forked distributions are located inside the path "/etc/sysconfig/" on Debian forked systems they will be in the path "/etc/default/".

```shell
cat /etc/sysconfig/replicated
RELEASE_CHANNEL=beta
PRIVATE_ADDRESS=10.138.0.2
SKIP_OPERATOR_INSTALL=0
REPLICATED_OPTS="-e LOG_LEVEL=info -e DAEMON_TOKEN=CgxLAnVRZcYH2Hl5Hjj6W265PyYVfG4u -e NODENAME=replicated-qa"
```
Inside the replicated file only one variable will need to be changed which is `PRIVATE_ADDRESS`

```shell
cat /etc/sysconfig/replicated-operator
RELEASE_CHANNEL=beta
DAEMON_ENDPOINT=10.138.0.2:9879
DAEMON_TOKEN=CgxLAnVRZcYH2Hl5Hjj6W265PyYVfG4u
DAEMON_HOST=10.138.0.2
PRIVATE_ADDRESS=10.138.0.2
REPLICATED_OPERATOR_OPTS="-e LOG_LEVEL=info -e TAGS=local -e NODENAME=replicated-qa"
```

Inside the replicated-operator file the three variables `DAEMON_ENDPOINT, DAEMON_HOST, and PRIVATE_ADDRESS` will need to be changed to match the new IP address of the host server which Replicated is installed on.

## Restart the replicated and replicated-operator service.
```shell
service replicated restart

service replicated-operator restart
```