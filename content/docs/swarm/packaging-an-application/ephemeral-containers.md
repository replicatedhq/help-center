---
date: "2016-07-03T04:02:20Z"
title: "Ephemeral Containers"
description: "Running database migrations or one-off jobs with Replicated and Docker Swarm."
weight: "602"
categories: [ "Packaging a Swarm Application" ]
index: "docs/swarm"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

Database migrations are an important part of any software upgrade, and having a strategy to manage data migrations in enterprise deployments is important. One common pattern to manage database migrations is to run an ephemeral container along with container events to run migration tasks.

Using the swarm scheduler it is possible to achieve this behavior by [labeling the stack service](https://docs.docker.com/compose/compose-file/#labels-1) with `com.replicated.ephemeral=true`.

{{< linked_headline "Database Migrations Example" >}}

In the example below we show a simple python stack based on the Django framework and Postgres, and how to run database migrations. (No knowledge of python is necessary to understand this.)

You will notice there are three services defined in this `docker-compose.yml` extract, `postgres`, `migrate-pg`, and `app`.

The `postgres` service is using the default Postgres image you can find on Docker Hub. The environment variables are used to configure Postgres as it starts up.

The second service is `migrate-pg`. There are three config items which are recommended for migration containers. The first is `depends_on`, which slightly delays the container startup until the `postgres` container is running. The second is `deploy.restart_policy.condition` configured to only restart the container if the exit code indicates it failed. And the final config item is `deploy.labels."com.replicated.ephemeral"` being set to `true`. This tells Replicated to not restart the container when it exits.

The final service is `app`, which uses a fairly standard config, along with the `DB_URL` Postgres connection string. It's recommended that your application fails fast if the database or schema is not ready. When this happens Docker will restart the service, so if your migrations take 30 seconds to run, your `app` service will be restarted until everything is ready.


```yaml
services:
  postgres:
    image: postgres:10.1
    restart: always
    ports:
      - "5434:5432"
    environment:
      - POSTGRES_USER=pythonapp
      - POSTGRES_DATABASE=pythonapp
      - POSTGRES_PASSWORD=password
      - POSTGRES_HOST=postgres
      - POSTGRES_PORT=5432
    volumes:
      - postgres:/var/lib/postgresql/data

  migrate-pg:
    image: replicated/pythonapp:1.4.2
    command: ["python", "manage.py", "db", "upgrade"]
    deploy:
      labels:
        com.replicated.ephemeral: "true"
      restart_policy:
        delay: 3s
        condition: on-failure
    environment:
      - DB_URL="postgresql://pythonapp:password@postgres:5432/pythonapp"
    depends_on:
      - postgres

  app:
    image: replicated/pythonapp:1.4.2
    deploy:
      replicas: 2
      restart_policy:
        delay: 3s
    ports:
      - "5000:3000"
    environment:
      - DB_URL="postgresql://pythonapp:password@postgres:5432/pythonapp"
```

{{< linked_headline "Additional Uses" >}}

Ephemeral containers can also be used for one-off jobs via the Docker API. This allows your application to talk directly to Docker by mounting the socket and scheduling one-off jobs as required by your application.

```yaml
services:
  job-scheduler:
    image: myapp/jobscheduler:1.0.0
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

For more information on this topic, check out [One-shot containers on Docker Swarm](https://blog.alexellis.io/containers-on-swarm/).