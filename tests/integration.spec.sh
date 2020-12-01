#!/bin/bash

set -e

echo ">>> Clean up previous integration test run..."
sh -c "rm -rf ./eleventy-integration-test"
sh -c "rm -rf ./scripts/storage"

local_registry="http://localhost:4873"

echo ">>> Setting Eleventy installation..."
mkdir -p ./eleventy-integration-test

echo ">>> Configure plugin and add emoji to a page..."
echo "{ \"name\": \"eleventy-integration-test\", \"version\": \"1.0.0\" }" > eleventy-integration-test/package.json
cp tests/fixtures/eleventy-config.js eleventy-integration-test/.eleventy.js
echo "# Hello World :tiger:" > eleventy-integration-test/index.md

echo ">>> Start local registry..."
tmp_registry_log=`mktemp`
echo "Local registry output file=$tmp_registry_log"
nohup npx verdaccio --config ./scripts/verdaccio.yaml &>$tmp_registry_log &
grep -q 'http address' <(tail -f $tmp_registry_log)

echo ">>> Login to local registry and publish package..."
npx npm-auth-to-token -u test -p test -e test@test.com --registry $local_registry
npm --registry $local_registry publish

echo ">>> Install '@fec/eleventy-plugin-remark' from local registry..."
cd eleventy-integration-test
npm install @fec/eleventy-plugin-remark remark remark-html remark-emoji @fec/remark-a11y-emoji --registry $local_registry

echo ">>> Build Eleventy..."
npx @11ty/eleventy

echo ">>> Check if HTML is generated..."
if grep "🐯" _site/index.html
then
  echo "Success: HTML is generated generated"
  exit 0
else
  echo "Failure: HTML is not generated"
  exit 1
fi
