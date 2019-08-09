---
date: "2018-01-30T04:02:20Z"
title: "Automating your workflow"
description: "Learn best practices around managing your releases in version control to enable collaboration and automation."
weight: "800004"
categories: [ "Docker Swarm Guide" ]
index: "guides/swarm"
type: "chapter"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

Now that you've made some releases using the UI in vendor.replicated.com, its time to check your yaml into source control and start collaborating with your team. We'll use the
[Replicated Swarm Starter](https://github.com/replicatedhq/replicated-starter-swarm) as a starting point for this.

{{< linked_headline "Prerequisites " >}}

This guide assumes you've already completed the steps in [create-release](../create-swarm-app) and [install](../installing). If you haven't already,
you should complete those guide sections first. You'll also need:

- [node](https://nodejs.org/en/download/)
- `make`
- A git repository created to manage your Replicated YAML. We'll use github in this example.

{{< linked_headline "Get Started" >}}

First, clone [the starter repo](https://github.com/replicatedhq/replicated-starter-swarm), and re-initialize it


```sh
git clone github.com/replicatedhq/replicated-starter-swarm.git
cd replicated-starter-swarm
rm -rf .git
git init
git remote add origin <your git repo>
```

{{< linked_headline "Configure Environment" >}}

You'll need to set up two environment variables to interact with vendor.replicated.com,
`REPLICATED_APP` and `REPLICATED_API_TOKEN`. `REPLICATED_APP` should be set to the
app name in the URL path at https://vendor.replicated.com/apps:

<p align="center"><img src="/images/guides/swarm/REPLICATED_APP.png" width=600></img></p>

Next, create an API token from the [Teams and Tokens](https://vendor.replicated.com/team/tokens) page:

<p align="center"><img src="/images/guides/swarm/REPLICATED_API_TOKEN.png" width=600></img></p>

Ensure the token has "Write" access or you'll be unable create new releases. Once you have the values,
set them in your environment.

```sh
export REPLICATED_APP=...
export REPLICATED_API_TOKEN=...
```

You can ensure this is working with

```sh
make deps list-releases
```

{{< linked_headline "Iterating on Releases" >}}

Once you've made changes to `replicated.yaml`, you can push a new release to a channel with

```sh
make release channel=Unstable
```

For an integrated development approach, you can use `make watch` to
watch the `replicated.yaml` file, linting and releasing whenever changes are made.

```sh
make watch channel=my-dev-channel
```

{{< linked_headline "CLI with Docker" >}}

Use `replicated/vendor-cli` Docker image to execute the CLI inside a container. This is useful in environments where `make` and `replicated` vendor CLI are unsupported, such as Windows OS.

The example below shows `replicated` vendor cli help, this can be used as a scaffold to build other commands.
```sh
docker run \
  -e REPLICATED_APP \
  -e REPLICATED_API_TOKEN \
  replicated/vendor-cli --help
```

Run the following to list releases and verify Docker vendor CLI works.
```sh
make docker-list-releases
```

Push new release to a channel with Docker vendor CLI.
```sh
make docker-release channel=Unstable working_dir=/path/to/git/repo
```

{{< warning title="Operating Systems Compatibility" >}}
On Windows OS ensure the `working_dir` is shared and available in Docker (Settings -> Shared Drives).
{{</warning>}}

{{< linked_headline "Integrating with CI" >}}

Often teams will use one channel per developer, and then keep the `master` branch of this repo in sync with their `Unstable` branch.

The project includes CI configs for [Travis CI](https://travis-ci.org), [CircleCI](https://circleci.com), [Jenkins CI](https://jenkins.io) and [GitLab CI](https://gitlab.com).

The configs will:

**On pull requests**:

- Install dependencies
- Lint yaml for syntax and logic errors

**On merges to the github `master` branch**:

- Install dependencies
- Lint yaml for syntax and logic errors
- Create a new release on the `Unstable` channel in Replicated

These behaviors are documented and demonstrated in the [replicated-ci-demo](https://github.com/replicatedhq/replicated-ci-demo) project.

