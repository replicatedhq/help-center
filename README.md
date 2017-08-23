## Local development

Before you are able to run this locally you need to have [Hugo installed](https://gohugo.io/getting-started/installing/) on your machine. If you already have Hugo installed, make sure you [have the latest version](https://gohugo.io/getting-started/installing/#upgrade-hugo).

1. Install project dependencies
   ```bash
   make install
   ```

1. Setup API docs
   ```bash
    make setup
    make VENDOR_SWAGGER_SOURCE="https://api.staging.replicated.com/vendor" vendordocs
    ```

1. Inside of the `themes/replicated-docs-theme` folder, run
    ```bash
    git submodule init
    ```

    and then
    ```bash
    git submodule update
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

Included in this project is the [hugo-algolia](https://github.com/10Dimensional/help-center) package, which crawls the /content folder of the site and indexes all the content. If you want to re-index the site and/or add new docs content, you can use the following commands:

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
