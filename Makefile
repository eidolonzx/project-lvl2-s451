install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

publish:
	npm publish

test:
	npm run test

lint:
	npx eslint .