#!/usr/bin/env bash

for i in "$@"
do
case $i in
    -e=*|-branch=*)
    BRANCH="${i#*=}"
    shift
    ;;
    -s=*|-buildnr=*)
    BUILDNR="${i#*=}"
    shift
    ;;
    -l=*|-version=*)
    VERSION="${i#*=}"
    shift
    ;;
    *)
    ;;
esac
done
#echo "BRANCH  = ${BRANCH}"
#echo "BUILDNR  = ${BUILDNR}"
echo "NPM Version: ${VERSION}"

# write version to npm_version file.
echo "version: ${VERSION//+/-}" > npm_version

# replace token in package.json
simple-generator -d npm_version -t package.json.tmpl > package.json

# publish package to registry
npm publish --registry http://artifact.devres.internal.adcubum.com/artifactory/api/npm/npm-virtual/
