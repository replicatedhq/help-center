---
date: "2017-08-22T00:00:00Z"
lastmod: "2017-08-22T00:00:00Z"
title: "Error Message: Can not set cookie: dm_set_cookie failed"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Docker", "Errors"]
kb-sections: ["Troubleshooting"]
---

When dealing with a large number of containers pulling in parallel, containers may fail with the following error:

```
Failed to remove replicated container, retrying
Error response from daemon: driver "devicemapper" failed to remove root filesystem for 3d101377c1f7124c941329953db8287c052679b7ec77bd65bb14cc8018e0d212: failed to remove device 285b6331bf7fc15d068a93e30f3cc0a9cb0c42d1755fbdd64b1f26f015e5f530: devicemapper: Can not set cookie: dm_task_set_cookie failed
```

This problem can surface when upgrading a server that has been running Docker 17.06 and for a while and has started and stopped a number of containers.

This problem been identified as a regression in devicemapper and is present in Docker 17.06.0. It has been fixed in 17.06.2. There are two work arounds for this issue as well:

## Restart the Docker Daemon

Restarting the Docker daemon periodically will free up leaked semaphores, allowing containers to be properly created. If you run into this problem, simply restarting Docker will allow you to remove the container and continue.

## Increase Semaphore Limits

For a more permenant solution, it's possible to increase the number of semaphores in sysctl settings. There is no specific maximum to the number of semaphores and semaphore sets that should be pre-allocated on systems, but is dependent on CPU and available RAM. Note, that devicemapper is leaking resources, so increasing the amount of semaphores will only use more resources and wait longer for the issue to surface.  Currently, the best workaround is to periodically restart the Docker daemon.

To see the current value, run:

```
$ cat /proc/sys/kernel/sem
250     32000   32     128
```

In order, these parameters are:

* SEMMSL - Maximum number of semaphores per semaphore set
* SEMMNS - Maximum number of Linux-wide semaphores
* SEMOPM - Maximum semaphore operations per semaphore system call
* SEMMNI - Maximum number of semaphore sets

To double the number of semaphore sets and semaphores in this example, run the following command:

```
sysctl -w kernel.sem="500 128000 100 256"
```

Note that `SEMMNS = SEMMSL * SEMMNI`. This ensures that the number of semaphore sets and semaphores per sets can be fully utilized. After setting these values, restart Docker or your system to apply the changes.


This can also be changed without restart with:

```
echo 500 128000 100 256 > /proc/sys/kernel/sem
```

To make the change permanent and not require a restart, use both methods.

# Recommended Settings

In general, the system defaults for semaphore limits are the recommended values. However, when changing them, Replicated recommends increasing to cover the existing semaphore count while not using too much shared memory. `ipcs -a` will show semaphore counts by process, while `top` can be used to correlate shared memory use in those processes. You can always reach out to us at <a href="mailto:support@replicated.com">support@replicated.com</a> or in Slack for additional guidance.
