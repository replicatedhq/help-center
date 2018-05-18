---
date: "2018-05-01T19:00:00Z"
title: "Testing The Customer Installation"
description: "A step-by-step guide of what the experience will be like installing the application"
weight: "30003"
categories: [ "Ship Guide" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

{{< note title="Part 3 Of A Series" >}}
This is part 3 of a guide that walks through creating a sample application in Replicated Ship. If you haven't followed the previous sections of this guide, go back to [deploying an application](../create-a-release) before following this guide.
{{< /note >}}

{{< linked_headline "Installing the Release" >}}

Now we can produce an installation script for our test customer.

![Install A Release](/images/guides/ship/install-script.png)

Copy the command from this screen, and take it to a workstation that has Docker installed, and run it. This is how you can distribute software that's packaged in Ship.

```shell
$  docker run \
>       --interactive \
>       --tty \
>       --rm \
>       --name ship \
>       --volume $PWD:/out \
>       --volume /var/run/docker.sock:/var/run/docker.sock \
>       replicated/ship:alpha \
>       --customer-id "mJl1-kiStMfX5cP6HVxL32rYiay5BqKd"  \
>       --customer-endpoint="https://pg.staging.replicated.com/graphql"

This tool will prepare assets so you can deploy GitLab-Enterpise
to your existing Kubernetes cluster

Gitlab Configuration Options
Enter a value for option "domain_name": gitlab.somebigbank.com
Enter a value for option "external_ip": 10.1.1.150
Enter a value for option "gitlab_root_password":
Enter a value for option "certificate_email": security@somebigbank.com
Enter a value for option "external_postgres": postgres://user:password@pg
Enter a value for option "postgres_host":
Enter a value for option "postgres_k8s_secret_name":
Enter a value for option "postgres_password":
Enter a value for option "redis_ha":

This command will generate the following resources:

	./assets/install.sh
	./assets/uninstall.sh


Is this ok? [Y/n]: y

GitLab is ready to deploy to your kubernetes cluster.

If you have Helm configured locally, you can
run the following command to deploy GitLab to
your kubernetes cluster:

    bash ./scripts/install.sh


A state file has been written to {{repl context "state_file_path" }} -- please store it
somewhere safe, you'll need it if you want to recover or update this installation of GitLab.
```

{{< linked_headline "Instsalling to a cluster" >}}

Executing this install script generated everything that's needed to deploy our application to a Kubernetes cluster. But we need to bring a Kubernetes cluster, and should already have `kubectl` and `helm` set up and configured to continue with the next steps.

### Run the script

The output above includes this:

```shell
f you have Helm configured locally, you can
run the following command to deploy GitLab to
your kubernetes cluster:

    bash ./gitlab/scripts/install.sh
```

Looking at this file:

```shell
#!/bin/sh
$ cat ./gitlab/scripts/install.sh

git clone git@gitlab.com:charts/gitlab.git
helm dependencies update
helm upgrade --install gitlab . \
  --timeout 600 \
  --set global.hosts.domain={{repl config "domain_name"}} \
  {{repl if {{repl config "external_ip"}} }}--set global.hosts.externalIP={{repl config "external_ip"}}{{end}} \
  --set gitlab.migrations.initialRootPassword={{repl config "gitlab_root_password"}} \
  --set certmanager-issuer.email={{repl config "certificate_email"}} \
  {{repl if {{repl config "external_postgres"}} }} --set global.psql.host={{repl config "postgres_host"}} \
  --set global.psql.password.secret={{repl config "postgres_k8s_secret_name"}} \
  --set global.psql.password.key={{repl config "postgres_password"}} {{repl end}} \
  {{repl if {{repl config "redis_ha"}} }}--set redis.enabled=false --set redis-ha.enabled=true{{repl end}}
```

This is the output of the script we templated last time.

Executing this:

```shell
$ ./gitlab/scripts/install.sh

helm doing things.
```