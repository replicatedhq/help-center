---
date: "2018-01-30T04:02:20Z"
title: "Iterating on Releases"
description: "Iterate on Applications by Deploying New Features"
weight: "8004"
categories: [ "Docker Swarm Guide" ]
index: "guides/swarm"
type: "guide"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{< linked_headline "Iterating on Releases" >}}

In this guide, we will extend on the Redis service we released in earlier guides. If you haven't created and installed a Redis service via Replicated on Swarm, please start with [Creating a Swarm App](../create-swarm-app) and [Installing](../installing).

{{< linked_headline "Iterating on Releases" >}}

Now that our Redis service is running on a Replicated on Swarm install, it is time to start iterating on and deploying releases for our application. While Software as a Service deployment environments are often static to your environment, enterprise environments are diverse and require the ability to adapt your service to their environments.

Replicated adapts your application to enterprise environments with user-defined configuration, identity provider integration, audit logging, snapshots, and more. In this guide, we will add a configuration value to set the Redis timeout, create a Redis configuration file, and template this Redis configuration to match this configured timeout. When the configuration is changed, a new configuration value will be written and used by our application.

To start iterating on our application, navigate to the Releases dashboard from the Replicated Vendor Portal. On this dashboard, you will see the first release that we created. At the top, click the "Create release" button. Once again, we are on the Create a Release page with the YAML editor that we used in [Creating a Swarm App](../create-swarm-app). This time the content reflects the last release we created, and includes our Redis service.

{{< linked_headline "Add Configuration Option" >}}

The first part of updating our release YAML is adding the new configuration option to the release. This is done in the `# kind: replicated` section, and a default field for the hostname has been provided for us. We don't need this value, so replace it with some text that specifies our Redis timeout:

```yaml
config:
- name: redis
  title: Redis Configuration
  description: Redis Configuration Items
  items:
  - name: timeout
    title: Timeout
    type: text
    required: true
```

This YAML defines a configuration option named `redis.timeout` that is required. On the right, our preview has updated to match this new config option.

Next, we will template this field into a redis configuration file and expose that file to our Redis service.

{{< linked_headline "Add Swarm Configuration" >}}

As of Docker Compose 3.3, Swarm is now able to use configuration files as part of the Docker Compose manifest. To use this, we must define a Swarm configuration section in our `# kind: replicated` section that we will use in our `# kind: scheduler-swarm` section. Below `config:`, but above the start of our Swarm definition, add the following YAML:

```yaml
swarm:
  configs:
  - name: redis_config
    value: |
      bind 127.0.0.1
      port 6379
      timeout {{repl ConfigOption "redis.timeout" }}
```

This specifies a `redis_config` configuration value that we can use in our Compose spec. Due to the mechanics of the Swarm integration, this config must be specified as an external use that will get injected by Replicated when it is scheduled. At the bottom of the `# kind: scheduler-swarm` section, add the following YAML:

```yaml
configs:
  redis_config:
    external: true
```

This specifies our redis_config as an external source pre-defined in `docker config`. When scheduling our application, Replicated will create this Docker config so that it can be used by our application.

The last step we need to take is to tie this configuration option into our Redis service as a file. Change our Redis service to:

```yaml
services:
  redis:
    image: redis:3.2-alpine
    command: "redis-server /usr/local/etc/redis/redis.conf"
    configs:
    - source: redis_config
      target: /usr/local/etc/redis/redis.conf
```

The `configs` section takes our external `redis_config` file as a source, and mounts it to the target location inside of the service container. Because Redis takes a configuration file as it's first argument, we explicitly supply a command to the service definition to use this file.

The last thing we need to do is update our Swarm version. When creating our application, we specified version 3, but configs were introduced in 3.3. Update the first line of our `# kind: scheduler-swarm` to:

`version: '3.3'`

By the end, our release should look something like this:

```yaml
---
# kind: replicated

replicated_api_version: 2.9.2
name: "myredisapp"

properties:
  console_title: "myredisapp"

#
# https://help.replicated.com/docs/kb/supporting-your-customers/install-known-versions/
#
host_requirements:
  replicated_version: ">=2.9.2"

#
# Settings screen
# https://help.replicated.com/docs/packaging-an-application/config-screen/
#
config:
- name: redis
  title: Redis Configuration
  description: Redis Configuration Items
  items:
  - name: redis_timeout
    title: Timeout
    type: text
    required: true

swarm:
  configs:
  - name: redis_config
    value: |
      bind 127.0.0.1
      port 6379
      timeout {{repl ConfigOption "redis_timeout" }}

---
# kind: scheduler-swarm
version: '3.3'
services:
  redis:
    image: redis:3.2-alpine
    command: "redis-server /usr/local/etc/redis/redis.conf"
    configs:
    - source: redis_config
      target: /usr/local/etc/redis/redis.conf

configs:
  redis_config:
    external: true
```

This release is now ready. Save it and return to the Releases dashboard.

We can now promote this release and update the instance we created in the [Installing](../installing) section.

{{< linked_headline "Promote Release" >}}

The Release Dashboard shows 2 releases now. We can see that release sequence 1 is pinned to Unstable. Before updates are propagated to channels, we must update the channel to the release we want. Click "Promote" next to release sequence 2, check the "Unstable" channel, and promote the release.

Our release is now the current version for the "Unstable" channel. It's now time to update our application.

{{< linked_headline "Update Application" >}}

The [Installing](../installing) section required us to install Replicated and a license onto a new server. Return to that server's dashboard with our running application. The base dashboard has a "Check Now" button that we can use to discover and update to our new release. Click it, and we will be prompted to install the new release.

After the release is installed, we need to re-configure our application to start it. Go to the "Settings" page where our new timeout value is available. Enter a number like `0` to disable it and return to the Dashboard to start our application.

Once the application is started, we can SSH into the server. Find the container running our Redis instance via `sudo docker ps` and exec into a shell on it with something like:

```shell
$ sudo docker exec -ti replf3627c40_redis.1.hafqm00l1skzkqk0y41gzzr5a /bin/sh
```

We're now in the running environment of our Redis service. If you execute `cat /usr/local/etc/redis/redis.conf`, you will see the output printed out that matches the configuration we supplied in the release, and our timeout value templated in.

{{< linked_headline "Where are my configs?" >}}

Replicated stores configuration via `docker config`. There are also Docker Secrets, accessed via `docker secret`. When starting an application, Replicated updates the values in configs and secrets, and references them from Swarm applications that are using them. These secrets are managed by Docker and are not stored on the filesystem outside of your services.

{{< linked_headline "Next Steps" >}}

Congratulations! You have successfully created a Docker Swarm app, converted it into a Replicated on Swarm application, and deployed it to a running server running Swarm. From there, you created a new release to make it configurable for your end users.

You're ready to begin customizing this application to meet your needs, or create a new one from scratch. As always, we are here to help you succeed on building your application in Replicated. For more help, check our [community](https://help.replicated.com/community) or our [Swarm documentation](https://help.replicated.com/docs/swarm).
