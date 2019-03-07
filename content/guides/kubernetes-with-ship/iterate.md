---
date: "2018-05-01T19:00:00Z"
title: "Shipping an Update"
description: "A workflow for making and testing changes to your Ship application."
weight: "30104"
categories: [ "Get Started with Ship" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

{{< note title="Part 4 Of A Series" >}}
This is part 4 of a guide that walks through creating a sample application in Replicated Ship. If you haven't followed the previous sections of this guide, go back to [deploying an application](../create-a-release) before following this guide.
{{< /note >}}

{{< linked_headline "Shipping an Update" >}}

Now that you've run through your first installation, its time to get a feel for what updates feel like. This will take two steps:

- Modifying the Ship YAML in [vendor.replicated.com](https://vendor.replicated.com) and promoting a new release
- Running `ship update` on a workstation to pull the latest release

{{< linked_headline "Step 1: Updating your release" >}}

For this example, we'll add some custom messaging to our end customer's workflow to explain the prerequisites for our example application.
To update the release, head over to [Ship Releases](https://vendor.replicated.com/releases), and create a new release:

![update release](/images/guides/ship/create-another-release.png)


Since releases are immutable, this creates a new "Draft" on the channel, which we can promote when we're ready. Lets update the `lifecycle` section to include a page with the app version and release notes. We'll add the following `message` step in between the first and second steps:

```yaml
    - message:
        contents: |
          ### {{repl Installation "channel_name"}} v{{repl Installation "semver"}}

          {{repl Installation "release_notes"}}
```

Your entire lifecycle should look like [the example here](https://github.com/replicatedhq/ship/blob/master/fixtures/just-nginx-releasenotes/ship.yaml#L59).

Once you've updated your YAML, you can promote a new release, give it a version of `0.2.0`, and add some release notes:

![release-notes](/images/guides/ship/promote-another-release.png)

![release-notes](/images/guides/ship/promote-another-release-2.png)

{{< note title="Injecting Metadata" >}}
This makes use of the `Installation` template function to inject metadata about the application release. To learn more, you can review the [metadata fields available](https://github.com/replicatedhq/ship/blob/15dacf959485ffd8e9681220c2c6cf5fa5e97559/pkg/templates/installation_context.go#L37).
{{< /note >}}

{{< linked_headline "Re-running the installation" >}}

Next, lets pull the updated release using `ship update`. This will assume you've already been through the instructions in [Testing the installation](../installing), and that you have an existing `.ship/state.json` in your working directory.

If don't have a `.ship/state.json` from the previous step, or if you just want to start from scratch, then you can re-run the same `ship init` command from [Testing the installation](../installing#run-the-command), and skip ahead to [headless updates](#using-headless-mode).

###  Running the update

First, ensure we're in the right directory

```shell
$ find .
.
./.ship
./.ship/state.json
./installer
./installer/k8s
./installer/k8s/nginx-service.yaml
./installer/k8s/nginx-deployment.yaml
```

Remove the `installer` directory, but leave `.ship` in place.

```shell
rm -rf installer
```

Then run the update:

```bash
ship update --headed
```

And you'll see a similar prompt as in the initial installation. Walking through the installer, you should see your new `message` step reflected in the UI:

![install-message](/images/guides/ship/release-notes-message.png)


{{< linked_headline "Using Headless Mode" >}}

By default `ship update` will do a [headless update](#using-headless-mode), but we use the `--headed` flag above so we can see our changes reflected in the UI.

When iterating on your application assets, you can usually move more quickly by skipping the UI, and running headless updates.

```shell
ship update
```

If you'd like, you can experiment with making changes to the the Kubernetes YAML in your release YAML, and seeing updates reflected in the `installer/k8s` directory after a headless update. Again, to do an update with the UI, you can use 

```shell
ship update --headed
```

### Next steps

Now that we have a feel for how managing releases works, its time to get set up with [a ship development environment](../iterate-locally) for offline iteration or [deliver a private image](../private-image) with ship.
