
build:
	mkdir -p themes
	git clone git@github.com:replicatedhq/replicated-docs-theme.git themes/replicated-docs-theme || true
	(cd themes/replicated-docs-theme; git pull)
	yarn
	hugo

serve:
	hugo serve
