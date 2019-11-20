VENDOR_SWAGGER_SOURCE ?= "https://api.replicated.com/vendor"

SHELL := /bin/bash -o pipefail
install:
	if command -v "brew" > /dev/null 2>&1; then brew install hugo; fi
	yarn

build:
	hugo -v

build-staging:
	hugo -v --config config.staging.yaml

build-prod:
	hugo -v --config config.prod.yaml

serve:
	hugo serve --disableFastRender

serve-staging:
	hugo serve --config config.staging.yaml

serve-prod:
	hugo serve --config config.prod.yaml

index-site:
	yarn index-site

index-and-send:
	yarn index-and-send

index-and-send-staging:
	yarn index-and-send-staging

vendordocs:
	rm -f content/docs/reference/vendor-api.md
	git checkout content/docs/reference/vendor-api/index.md
	find . -name "*vendor-api*" -ls
	VENDOR_API="${VENDOR_SWAGGER_SOURCE}" ./vendor.sh

setup:
	mkdir -p java
	curl -o java/swagger2markup-cli-1.3.1.jar http://central.maven.org/maven2/io/github/swagger2markup/swagger2markup-cli/1.3.1/swagger2markup-cli-1.3.1.jar
	curl -o java/swagger2markup-1.3.1.jar http://central.maven.org/maven2/io/github/swagger2markup/swagger2markup/1.3.1/swagger2markup-1.3.1.jar


deps-linkcheck:
	npm install -g broken-link-checker@0.7.8

# this skips *all* of community, but its a start
# it only really works against prod right now, but with some more exclusions
# it could probably work for staging as well. Notably, we have no community
# in staging. For now just want to run this in prod and see how it feels,
# not blocking any builds yet.
#
#  Will try to run deps_linkcheck unless `blc` is installed globally somewhere
linkcheck:
	[[ -x "$(shell which blc)" ]] || $(MAKE) deps-linkcheck && \
	blc https://help.replicated.com -r \
		--host-requests 20 \
		--requests 20 \
		\
		--exclude 'server:8800' \
		--exclude 'titled:3000' \
		--exclude '10.128.0.4' \
		--exclude 'get.company.com/docker' \
		--exclude 'auditlog.mycompany.com' \
		--exclude 'registry.mycompany.com' \
		--exclude 'tail.mycompany.com' \
		\
		--exclude 'registry.replicated.com' \
		--exclude 'registry-data.replicated.com' \
		--exclude 'api.replicated.com' \
		--exclude 'get.replicated.com' \
		--exclude 'www.replicated.com/ship' \
		\
		--exclude 'help.replicated.com/community' \
		--exclude 'help.replicated.com/tos'  \
		--exlcude 'help.replicated.com/faq' \
		--exclude 'help.replicated.com/privacy' \
		--exclude 'help.replicated.com/guidelines' \
		\
		--exclude 'microsoft.com' \
		--exclude 'golang.org' \
		--exclude 'circleci.com' \
		\
		--color=always  | grep -E 'Getting|Finished|BROKEN|^$$'
