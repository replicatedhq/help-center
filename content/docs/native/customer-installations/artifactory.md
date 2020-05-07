Artifactory can be used alongside Replicated as a Docker pull-through cache for proxying public and private images. For more information on setting up Artifactory as a Docker Registry see [this document](https://www.jfrog.com/confluence/display/RTF/Docker+Registry).

## Installing with Artifactory

When installing Replicated, some additional parameters are required to notify Replicated of your Artifactory service. For example, running the following command will install Replicated configured to pull all images through an Artifactory server at address `artifactory.somebigbank.com`:

```shell
curl -sSL https://get.replicated.com/docker | sudo bash -s log-level=debug \
    artifactory-address=artifactory.somebigbank.com \
    artifactory-access-method=subdomain \
    artifactory-quay-repo-key=quayio-public \
    artifactory-auth=YWRtaW46cGFzc3dvcmQ=
```

Below is a table with arguments to the install scripts along with a description:

| Argument | Required | Default | Description |
|----------|----------|---------|-------------|
| artifactory-address | yes | | Address to the Artifactory registry |
| artifactory-access-method | no | url-prefix | url-prefix, subdomain, or port |
| artifactory-quay-repo-key | no | quay-remote | Artifactory repository key for proxying public quay.io images |
| artifactory-auth | yes | | Artifactory registry base64 encoded basic auth string credentials |

## Repository Keys

Replicated will only proxy public images included in your application directly through Artifactory. 3rd party private images will always be proxied through Replicated's registry at registry.replicated.com. For this reason, all remote repositories can be public except `registry.replicated.com`. For more details on how to add Replicated's registry as a remote, see [below](#adding-replicated-registry-as-a-remote).

By default Replicated will use the following repository keys when proxying images:

| Regsistry Address | Repository Key |
|-------------------|----------------|
| registry.replicated.com | replicated-remote |
| docker.io | docker-remote |
| quay.io | quay-remote |
| gcr.io | gcr-remote |

Additional keys can be specified in the file `/etc/replicated/registry_proxy.json` using property `artifactory.repository_key_map` as a mapping of registry domains to repository keys.

See below for an example of the `/etc/replicated/registry_proxy.json` file:

```
{
  "artifactory": {
    "address": "artifactory.somebigbank.com",
    "auth": "YWRtaW46cGFzc3dvcmQ=",
    "access_method": "subdomain",
    "repository_key_map": {
      "quay.io": "quayio-public",
      "docker.io": "docker-public",
      "registry.replicated.com": "replicated-mycoolapp"
    }
  }
}
```

## Adding Replicated Registry as a Remote

The License ID can be used as the username along with password "token" to obtain read-only access to Replicated's Registry.

You can obtain the License ID from the Vendor Portal in the from the Customers page in the URL. For example `https://vendor.replicated.com/apps/<app id>/customer/<license id>/manage`.

The License ID can also be obtained from the `.rli` file by running the following command:

```shell
$ cat ./license.rli | tar -xO - | iconv -f utf-8 -t utf-8 -c | sed -n 's/.*{"id":"\([^"]*\)".*/\1/p'
7735955169a448f15c0b890376446ea6
```
