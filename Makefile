swag:
	cd backend && ../tools/bin/swag init \
		--generalInfo cmd/main.go \
		--output docs \
		--parseDependency \
		--parseInternal

.PHONY: swag
