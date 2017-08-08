
install:
	yarn

build:
	hugo

serve:
	hugo serve

index-site:
	hugo-algolia

index-all:
	hugo-algolia -wo -m & hugo-algolia -m 'categories' -p 'title, uri, categories, description' -i 'content/docs/**' -o 'data/docs/categories.json'

index-all-and-send:
	hugo-algolia -wo -m -s & hugo-algolia -m 'categories' -p 'title, uri, categories, description' -i 'content/docs/**' -o 'data/docs/categories.json'

index-and-send:
	hugo-algolia -s

index-multInd:
	hugo-algolia -wo -m

index-and-send-multInd:
	hugo-algolia -wo -m -s

index-partial-categories:
	hugo-algolia -m 'categories' -p 'title, uri, categories, description' -i 'content/docs/**' -o 'data/docs/categories.json'

index-partial-tags:
	hugo-algolia -m 'categories' -p 'title, uri, tags, description' -i 'content/docs/**' -o 'data/docs/tags.json'


