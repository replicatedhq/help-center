---
title: "Deploying Postgres on the Replicated Scheduler"
description: "Instructions for installing additional nodes with a Replicated cluster"
keywords: "postgres"
index: "tutorials"
---

{{< note title="How to use this sample application" >}}
The sample applications provided here are complete, tested and full featured implementations of common components. You are free to use any or all of the following sample in your application. We recommend that you read the description and choose whatever parts of this example is relevant to your application.
{{< /note >}}

## Replicated Tutorial: Postgres
Postgres is a popular relational database that is used in many applications, both in the cloud and when deployed in Replicated. When running Postgres as part of a multi-tenant, hosted cloud product, it's common to use a Postgres-as-a-Service solution such as RDS or Compose to manage the database instance. Unfortunately you can't depend on enterprise customers having access to these same services, so it's common to ship Postgres as a container in a Replicated application. Fortunately, it's not too difficult to run Postgres in a container and is compatible with all of the schedulers offered by Replicated.

### Overview
This complete Postgres example will configure a specific version of the Postgres container from the DockerHub official images into a Replicated application using the [Replicated scheduler](/schedulers). The example shows how to securely configure Postgres and ensure it's configured to persist data between restarts and updates. Next, the example will show how to run schema migrations on this instance, and then sequence the startup to connect from a sample NodeJS application. Finally, the example will show how to configure Postgres to be included in a no-downtime Replicated snapshot by using pgdump.

The final YAML for this sample application is available in [our tutorials GitHub repository](https://github.com/),

### Step 1: Config
To start, we want to include a [command](/docs/packaging-an-application/commands/) and a [configuration option](/docs/packaging-an-application/config-screen/) to generate a random password to be used for the Postgres user account. It's important to make these different for each installation, and this example will accomplish this. We will also add the `exclude_from_support` attribute to the `postgres_password` config item to ensure it will be [redacted from all support bundles](/) that are generated.

```yaml
cmds:
  - name: generate_random_password
    cmd: random
    args:
      - "32"

config:
  - name: database
    title: Database
    description: The database password is randomly generated for you,
    items:
      - name: postgres_password
        title: Postgres Password
        type: text
        hidden: true
        readonly: true
        is_excluded_from_support: true
        value_cmd:
          name: generate_random_password
          value_at: 0
```

### Step 2: The Postgres Container
When using the Replicated scheduler, we will include the postgres 9.6 container image, initialize it with a static username and the dynamic password generated above. We will include a volume to make sure the data persists across restarts and updates.

We also choose to listen on the Private IP address of the node that Postgres is running on. This allows other nodes in the cluster to connect to and access the database. The Replicated scheduler does not create an overlay network or enable container to container communication directly. You must use host networking to connect to Postgres.

```yaml
components:
  - name: db
    containers:
      - source: public
        image_name: postgres
        version: 9.6
        env_vars:
          - name: POSTGRES_DB
            static_val: 'myappdb'
          - name: POSTGRES_USER
            static_val: 'myappuser'
          - name: POSTGRES_PASSWORD
            static_val: '{{repl ConfigOption "postgres_password" }}'
          - name: PGDATA
            static_val: '/var/lib/postgresql/data/testdb'
        ports:
          - private_port: "5432"
            public_port: "5432"
        volumes:
          - host_path: /appdata/postgres
            container_path: /var/lib/postgresql/data
            owner: 999
```

#### Migrations
Now that the database is defined, let's continue and add a a schema migration container into the same component. It doesn't matter how you are running schema migrations, this same process should be applicable. In this example, we'll use the [db-migrate](https://github.com/db-migrate/node-db-migrate) tool to manage the database schemas. This is a an image in DockerHub, but the source code for it is included in the [tutorials repo](https://github.com/replicatedhq/tutorials/).

To add migations, we need to add the migration container and pass the Postgres credentials as environment variables:

```yaml
components:
  - name: database
    containers:
      - source: public
        image_name: replicateddemos/postgres-migrate
        version: 0.0.1
        ephemeral: true
        env_vars:
          - name: POSTGRES_USER
            static_val: myappuser
          - name: POSTGRES_PASSWORD
            static_val: '{{repl ConfigOption "postgres_password"}}'
          - name: POSTGRES_HOST
            static_val: '{{repl ThisNodePrivateIPAddress}}'
          - name: POSTGRES_PORT
            static_val: "5432"
          - name: POSTGRES_DATABASE
            static_val: myappdb
```

The Postgres container must be running, initialized and accepting connections before we can run the migrations. We can solve this by adding a `publish_event` to the `postgres` container above like this:

```yaml
publish_events:
  - name: Postgres ready
    trigger: port-listen
    data: "5432"
    subscriptions:
      - component: db
        container: migrate
        action: start
```

#### Application
For this demo, we will just connect a simple NodeJS and Express application that writes the Guestbook schema from Postgres to the browser. The application doens't do anything interesting, but validates that there's a connection to the Postgres server and that the migrations have run successfully.

This is a public image in DockerHub, but the source code and Dockerfile are included in the [tutorials repository](https://github.com/replicatedhq/tutorials).

The application container YAML in Replicated looks like this:
```yaml
  - name: app
    containers:
      - source: public
        image_name: replicateddemos/posgres-app
        version: 0.0.1
        ports:
          - private_port: "3000"
            public_port: "80"
        env_vars:
          - name: PGUSER
            static_val: myappuser
          - name: PGPASSWORD
            static_val: '{{repl ConfigOption "postgres_password"}}'
          - name: PGDATABASE
            static_val: myappdb
          - name: PGHOST
            static_val: '{{repl NodePrivateIPAddress "db" "postgres"}}'
          - name: PGPORT
            static_val: "5432"
```

In addition to creating this container, we also need to make sure the application doesn't start until after the migrations have completed. We solve this by adding a `publish_event` to the `migrate` container:

```yaml
publish_events:
  - name: Migrations complete
    trigger: container-stop
    subscriptions:
      - component: app
        container: app
        action: start
```

#### Snapshots
Now that the application runs, creates a Postgres container and runs migration scripts, we can move to adding some additional Replicated functionality to this setup.

To enable snapshots, you can add the following additional volume and script to the `postgres` container, defined above:

```yaml
volumes:
  - host_path: /appdata/backup/postgres
    container_path: /backup
    owner: 999
config_files:
  - filename: /backup.sh
    file_mode: "0755"
    file_owner: "999"
    contents: |
      #!/bin/bash
      set -e
      PGUSER=postgres pg_dump test_db > db-backup
      mv db-backup /backup
```

When the users starts a snapshot, we will execute this script, which runs a `pgdump` from the primary volume into a second volume. We can also exclude the primary volume from being included in the snapshot; we only want the `pgdump` output, by adding the following attribute to the primary data volume:
```yaml
is_excluded_from_backup: true
```

Finally, the top level YAML here will enable the Snapshot functionality in the console. This will create an [admin command](https://replicated.com) that is an alias for the `/backup.sh` command written into the Postgres container. The actual backup command simply executes the admin command, and does not pause any containers. The result of this is a zero-downtime backup of the Replicated and Postgres data.

```yaml
backup:
  enabled: true
  hidden: false
  pause_containers: false
  script: |
    #!/bin/sh
    replicated admin --no-tty backup-postgres-db

admin_commands:
  - alias: backup-postgres-db
    command:
      - /backup.sh
    run_type: exec
    component: db
    image:
      image_name: postgres
      version: 9.6

```
