build-images:
	make build-client
	make build-server

task%:
	make build-$*

build-client:
	docker build ./client -t epikem/vocabo-client --no-cache

build-server:
	docker build ./server -t epikem/vocabo-server --no-cache

push-images:
	docker push epikem/vocabo-client
	docker push epikem/vocabo-server

build:
	docker-compose down
	docker-compose build --no-cache

# dev:
# 	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# prod:
# 	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up