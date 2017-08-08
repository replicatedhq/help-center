
install:
	yarn

build:
	hugo

serve:
	hugo serve

index-site:
	yarn hugo-algolia

index-and-send:
	yarn hugo-algolia -s

index-multInd:
	yarn hugo-algolia -wo -m

index-and-send-multInd:
	yarn hugo-algolia -wo -m -s

index-partial-categories:
	yarn hugo-algolia -m 'categories' -p 'title, uri, categories, description' -i 'content/docs/**' -o 'data/docs/categories.json'

index-partial-tags:
	yarn hugo-algolia -m 'categories' -p 'title, uri, tags, description' -i 'content/docs/**' -o 'data/docs/tags.json'


