## Local development

Before you are able to run this locally you need to have [Hugo installed](https://gohugo.io/getting-started/installing/) on your machine. If you already have Hugo installed, make sure you [have the latest version](https://gohugo.io/getting-started/installing/#upgrade-hugo).

1. Install project dependencies
   ```bash
   make install
   ```

2. Install asciidoctor
   ```bash
   brew install git ruby
   sudo gem install asciidoctor
   ```

3. Setup API docs
   ```bash
   make setup
   make SOURCE="https://api.staging.replicated.com/vendor" vendordocs
   ```

4. Build the project
   ```bash
   make build
   ```

5. Run the project
   ```bash
   make serve
   ```

6. In your browser navigate to `localhost:1313` to view the project.

### Indexing Content

Included in this project is the [hugo-algolia](https://github.com/10Dimensional/help-center) package, which crawls the /content folder of the site and indexes all the content. If you want to re-index the site and/or add new docs content, you can use the following commands:

#### Index the site 
This indexes the whole site and puts content into a single array.

```bash
make index-site
```

#### Index the site and send content to Algolia account
This indexes the whole site and sends the array to Algolia.

```bash
make index-and-send
```

#### Index site w/ multiple indices 
This command puts a `.md` file in an index depending on the `index` value specified in the front matter. 
```bash
make index-multInd
```

You can also swap the `index` (default) property for a different category:
```bash
yarn hugo-algolia -m "tags"
```

Whichever category you decide to use, the value can be either a `string` or `array`. If the index prop is an `array`, `hugo-algolia` will put a copy of the `.md` file content in every value/index contained within the array.

##### Sending multiple indices to Algolia account
```bash
make index-and-send-multInd
```

#### Partial/Shallow index
If you only want to index a portion of the docs, pass a `-p` flag, followed by the props/attributes you'd like to index.

You can also pass in custom inputs and outputs with the `-i` and `-o` flags.

```bash
yarn hugo-algolia -p 'title, uri, categories, description' -i 'content/docs/**' -o 'data/docs/categories.json'
```

This indexes the docs content by category and places the output into a `categories.json` file in the `data/docs/` folder.

**You can combine the `-m` and `-p` flags to create multiple indices with specific content.

##### Default partial commands
Two commands for partial indexing have already been provided:

Categories:
```bash
make index-partial-categories
```


Tags:
```bash
make index-partial-tags
```





