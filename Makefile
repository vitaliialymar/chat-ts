start:
	make start-backend & make start-frontend

install:
	npm ci
	make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

lint-frontend:
	make -C frontend lint