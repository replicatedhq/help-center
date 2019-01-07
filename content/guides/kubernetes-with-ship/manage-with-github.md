---
date: "2018-05-01T19:00:00Z"
title: "Collaborate in GitHub"
description: "Use a GitHub repository to collaborate with team members."
weight: "30109"
categories: [ "Get Started with Ship" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

{{< note title="Part 6 Of A Series" >}}
This is part 6 of a guide that walks through creating a sample application in Replicated Ship. If you haven't followed the previous sections of this guide, go back to [iterating locally](../iterate-locally) before following this guide. 
{{< /note >}}

With the [recommended repository layout](../iterate-locally) set up, the next step is to link your Ship spec in [console.replicated.com](https://console.replicated.com/ship) to the `ship.yaml` file in your git repository.


{{< linked_headline "Authorizing GitHub Access" >}}

{{< note title="GitHub only (for now)" >}}
This guide relies on GitHub-only Ship packaging features. The vendor tooling for Ship applications will eventually support other Git providers like GitLab and BitBucket, but for now this guide requires that your `ship.yaml` is stored in GitHub.
{{< /note >}}

From [console.replicated.com](https://console.replicated.com/ship), head over to "Account Settings":


![Console Account Settings](/images/guides/ship/console-account-settings.png)


From here, you'll want to select "Connect to GitHub" to authorize Replicated to access one or more GitHub repositories.

![Console Link GitHub](/images/guides/ship/console-link-github.png)

Then, you can select the repository in which you're storing your `ship.yaml` and Kubernetes manifests.

![Github Auth Repo](/images/guides/ship/github-auth-repo.png)

When you are done on GitHub, you should be taken back to the Ship Console, at which point we can link your channels to GitHub branches. Select "Edit Release" on your Nightly channel, then click "Use Github to manage releases for this channel."


![View Release](/images/guides/ship/view-release.png)

![Use Github](/images/guides/ship/use-github.png)

From here, you can configure the branch you want to use for the Nightly channel. There are a few options here, but in general we see the `master` branch used for Nightly, with separate `beta` or `release` branches used for the other release channels.


That's it! You're now set up for using GitHub as the single source of truth for your Ship application.


{{< linked_headline "Next Steps" >}}

Now that you've got a feel for Ship basics, its time to take [a deep dive into Ship features](../explore-features).

