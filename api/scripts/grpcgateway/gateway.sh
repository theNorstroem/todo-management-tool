#!/bin/bash

TARGETDIR=dist/grpc-gateway
mkdir -p $TARGETDIR/cmd
mkdir -p $TARGETDIR/autoregister

# the gateway
furo exportAsYaml | simple-generator -t scripts/grpcgateway/command.tpl > $TARGETDIR/cmd/cmd.go
furo exportAsYaml | simple-generator -t scripts/grpcgateway/gateway.tpl > $TARGETDIR/gateway.go

# the registration of the services..
furo exportAsYaml | simple-generator -t scripts/grpcgateway/autoregister.tpl > $TARGETDIR/autoregister/autoregister.go

# beautify
go fmt $TARGETDIR/cmd/cmd.go
go fmt $TARGETDIR/gateway.go
go fmt $TARGETDIR/autoregister/autoregister.go

echo "gateway sources generated"
echo "do not forget to add external dependencies to your go.mod and run a go mod vendor"