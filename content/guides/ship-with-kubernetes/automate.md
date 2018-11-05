---
date: "2018-01-30T04:02:20Z"
title: "Automating your workflow"
description: "Learn best practices around managing your releases in version control to enable collaboration and automation."
weight: "11004"
categories: [ "Kubernetes Guide" ]
index: "guides/kubernetes"
type: "chapter"
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

Now that you've made some releases using the UI in vendor.replicated.com, its time to check your yaml into source control and start collaborating with your team. We'll use the
[Replicated Kubernetes Starter](https://github.com/replicatedhq/replicated-starter-kubernetes) as a starting point for this.


{{< linked_headline "Prerequisites " >}}

This guide assumes you've already completed the steps in [create-release](../create-release) and [install](../install). If you haven't already,
you should complete those guide sections first. You'll also need:

- [node](https://nodejs.org/en/download/)
- `make`
- A git repository created to manage your Replicated YAML. We'll use github in this example.

{{< linked_headline "Get started" >}}

First, clone [the starter repo](https://github.com/replicatedhq/replicated-starter-kubernetes), and re-initialize it


```sh
git clone github.com/replicatedhq/replicated-starter-kubernetes.git
cd replicated-starter-kubernetes
rm -rf .git
git init
git remote add origin <your git repo>
```

{{< linked_headline "Configure Environment" >}}

You'll need to set up two environment variables to interact with vendor.replicated.com,
`REPLICATED_APP` and `REPLICATED_API_TOKEN`. `REPLICATED_APP` should be set to the
app name in the URL path at [https://vendor.replicated.com/apps](https://vendor.replicated.com/apps):

<p align="center"><img src="/images/guides/kubernetes/REPLICATED_APP.png" width=600></img></p>

Next, create an API token from the [Teams and Tokens](https://vendor.replicated.com/team/tokens) page:

<p align="center"><img src="/images/guides/kubernetes/REPLICATED_API_TOKEN.png" width=600></img></p>

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

{{< linked_headline "Integrating with CI" >}}

Often teams will use one channel per developer, and then keep the `master` branch of this repo in sync with their `Unstable` branch.

The project includes CI configs for [Travis CI](https://travis-ci.org) and [CircleCI](https://circleci.com).
Both configs will:

**On pull requests**:

- Install dependencies
- Lint yaml for syntax and logic errors

**On merges to the github `master` branch**:

- Install dependencies
- Lint yaml for syntax and logic errors
- Create a new release on the `Unstable` channel in Replicated

These behaviors are documented and demonstrated in the [replicated-ci-demo](https://github.com/replicatedhq/replicated-ci-demo) project.


