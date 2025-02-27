## Local development

Before you are able to run this locally you need to have NodeJS v8.x, [YARN](https://yarnpkg.com/lang/en/docs/install/) and [Hugo installed](https://gohugo.io/getting-started/installing/) on your machine. If you already have Hugo installed, make sure you [have the latest version](https://gohugo.io/getting-started/installing/#upgrade-hugo).

1. Install project dependencies
   ```bash
   make install
   ```

1. Back in the root of the project, run
   ```bash
   make build
   ```

1. And then run the project
   ```bash
   make serve
   ```

1. In your browser navigate to `localhost:1313` to view the documentation.

### Staging vs Prod

Help center can be built for either staging or prod via:

#### Prod
```bash
 make build-prod
```

```bash
 make serve-prod
```

#### Staging
```bash
 make build-staging
```

```bash
 make serve-staging
```

### Indexing Content

Included in this project is the [hugo-algolia](https://github.com/replicatedhq/hugo-algolia) package, which crawls the /content folder of the site and indexes all the content. If you want to re-index the site and/or send new docs content to Algolia, you can use the following commands:

#### Index the site
This command indexes the whole site and puts content into a single array.

```bash
make index-site
```

#### Index the site and send content to Algolia account
This command indexes the whole site and sends the array to Algolia.

```bash
make index-and-send
```

You can index and send content to our staging indices via:
```bash
make index-and-send-staging
```

### Adding the KOTS documentaion alert

Simply put the following shortcode after the front matter and before the main page content (or wherever you want the alert to appear) and replace the URL with the URL to the desired article.

```bash
{{< kotsdocs "https://kots.io" >}}
```