---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Migrating Your Application With Ephemeral Containers"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Application YAML"]
---

Database migrations are an important part of any software upgrade, and having a strategy to manage
data migrations in enterprise deployments is important. One common pattern to manage database migrations
is to run an [ephemeral container](/docs/packaging-an-application/components-and-containers/)
along with [container events](/docs/packaging-an-application/events-and-orchestration/)
to run migration tasks.

In this example, I will take a very simply python stack based on the Django framework and postgres, and show how to run database migrations. No knowledge of python is necessary to understand this.

## Database Component

Let's begin by creating a container in the Replicated based on the public postgres Docker image from
Dockerhub. This snippet will expose Postgre on port 5432 on the host, and define an event that
instructs Replicated to poll port 5432 on the host until a connection can be established. We are
going to use this event as a trigger to run the migration.

```yaml
- name: db
  containers:
  - source: public
    image_name: postgres
    version: 9.5
    env_vars:
    - name: POSTGRES_DB
      static_val: pythonapp
    - name: POSTGRES_USER
      static_val: 'some_user'
    - name: POSTGRES_PASSWORD
      static_val: 'some_password'
    volumes:
    - host_path: /data/postgresql/data
      container_path: /var/lib/postgresql/data
    ports:
    - private_port: "5432"
      public_port: "5432"
      port_type: tcp
    publish_events:
    - name: Postgres started and waiting for connections
      trigger: port-listen
      data: "5432"
      subscriptions:
      - component: db-migration
        container: pythonapp
        action: start
```

## Migration Component

Next, we will run our "app" component, but overriding the `CMD` in with `python manage.py db upgrade`,
which is how a migration is performed in a Django app. This should be replaced with `rake db:migrate`
or anything appropriate for your stack.

We define this container with `ephemeral: true` to indicate that this container is expected to exit.
Without this flag, Replicated will detect that the container exited, and will flag the entire app
as "Stopped" in the dashboard.

Finally, we listen for this container to stop, and fire an event to start the app container.

```yaml
- name: db-migration
  containers:
  - source: replicated
    image_name: pythonapp
    version: 1.4.2
    ephemeral: true
    env_vars:
      - name: DB_URL
        static_val: "postgresql://pythonapp:{{repl ConfigOption \"postgres_pw\"}}@{{repl NodePrivateIPAddress \"db\" \"postgres\" }}:5432/pythonapp"
    cmd: '["python", "manage.py", "db", "upgrade"]'
    publish_events:
    - name: db migration complete
      trigger: container-stop
      subscriptions:
      - component: python-app
        container: pythonapp
        action: start
```

## App Component

The app component is a standard Django app. We assume that it can start normally using a built in
`CMD` or `ENTRYPOINT` in the Dockerfile. We aren't overriding the `CMD` this time, so the container
will start serving the web site.

```yaml
- name: python-app
  containers:
  - source: replicated
    image_name: pythonapp
    version: 1.4.2
    env_vars:
      - name: DB_URL
        static_val: "postgresql://pythonapp:{{repl ConfigOption \"postgres_pw\"}}@{{repl NodePrivateIPAddress \"db\" \"postgres\" }}:5432/pythonapp"
```

If this release contains a **required** migration and the migration is not going to be present in future
releases, you can [mark this release as required](/docs/kb/developer-resources/optional-required/)
when promoting it.

For more on sequencing the startup of your application take a look at [this article](/docs/kb/developer-resources/sequencing-startup/).

[Download entire Replicated YML](https://github.com/replicatedhq/repl-yaml-samples/blob/master/apps/migration_python.yml).
