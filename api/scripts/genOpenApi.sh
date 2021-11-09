#!/usr/bin/env bash
WD=`pwd`

cd dist/allservices
mkdir -p ../openapi
protoc \
-I./ \
-I$WD/dependencies/github.com/theNorstroem/furoBaseSpecs/dist/proto \
-I$WD/dist/protos \
-I/usr/local/include \
-I$GOPATH/src/github.com/googleapis/googleapis \
--openapiv2_out=json_names_for_fields=false:../openapi --openapiv2_opt logtostderr=true \
./all-services.proto
