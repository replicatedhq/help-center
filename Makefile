VENDOR_SWAGGER_SOURCE ?= "https://api.replicated.com/vendor"

install:
	yarn

build:
	hugo -v

serve:
	hugo serve

index-site:
	yarn hugo-algolia

index-all:
	yarn hugo-algolia -wo -m & hugo-algolia -m 'categories' -p 'title, uri, categories, description' -i 'content/docs/**' -o 'data/docs/categories.json'

index-all-and-send:
	yarn hugo-algolia -wo -m -s & hugo-algolia -m 'categories' -p 'title, uri, categories, description' -i 'content/docs/**' -o 'data/docs/categories.json'

index-and-send:
	yarn hugo-algolia -s

index-multInd:
	yarn hugo-algolia -wo -m

index-and-send-multInd:
	yarn hugo-algolia -wo -m -s

index-partial-categories:
	yarn hugo-algolia -m 'categories' -p 'title, uri, categories, description' -i 'content/docs/**' -o 'data/docs/categories.json'

index-partial-tags:
	yarn hugo-algolia -m 'tags' -p 'title, uri, tags, description' -i 'content/docs/**' -o 'data/docs/tags.json'

vendordocs:
	rm -f content/docs/reference/vendor-api.md
	git checkout content/docs/reference/vendor-api/index.md
	find . -name "*vendor-api*" -ls
	VENDOR_API="${VENDOR_SWAGGER_SOURCE}" ./vendor.sh

setup:
	mkdir -p java
	curl -o java/swagger2markup-cli-1.3.1.jar http://central.maven.org/maven2/io/github/swagger2markup/swagger2markup-cli/1.3.1/swagger2markup-cli-1.3.1.jar
	curl -o java/swagger2markup-1.3.1.jar http://central.maven.org/maven2/io/github/swagger2markup/swagger2markup/1.3.1/swagger2markup-1.3.1.jar