## Local development

Before you are able to run this locally you need to have [YARN](https://yarnpkg.com/lang/en/docs/install/) and [Hugo installed](https://gohugo.io/getting-started/installing/) on your machine. If you already have Hugo installed, make sure you [have the latest version](https://gohugo.io/getting-started/installing/#upgrade-hugo).

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

1. In your browser navigate to `localhost:1313` to view the project.

### Indexing Content

Included in this project is the [hugo-algolia](https://github.com/10Dimensional/hugo-algolia) package, which crawls the /content folder of the site and indexes all the content. If you want to re-index the site and/or send new docs content to Algolia, you can use the following commands:

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
