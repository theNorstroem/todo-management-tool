# gRPC Gateway
> The gRPC-Gateway is a plugin of the Google protocol buffers compiler protoc. It reads protobuf service definitions and generates a reverse-proxy server which translates a RESTful HTTP API into gRPC. This server is generated according to the google.api.http annotations in your service definitions.

[Documentation](https://grpc-ecosystem.github.io/grpc-gateway/)

## Background information
gRPC is great – it generates API clients and server stubs in many programming languages, it is fast, easy-to-use, bandwidth-efficient and its design is combat-proven by Google. However, you might still want to provide a traditional RESTful API as well. Reasons can range from maintaining backwards-compatibility, supporting languages or clients not well supported by gRPC to simply maintaining the aesthetics and tooling involved with a RESTful architecture.

This project aims to provide that HTTP+JSON interface to your gRPC service. A small amount of configuration in your service to attach HTTP semantics is all that’s needed to generate a reverse-proxy with this library.

## V2 Migration
https://github.com/grpc-ecosystem/grpc-gateway/blob/v2/docs/_docs/v2-migration.md#we-now-use-the-camelcase-json-names-by-default