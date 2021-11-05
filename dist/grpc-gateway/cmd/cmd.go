package main

import (
	"flag"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	grpc_gateway "github.com/theNorstroem/todo-management-tool/dist/grpc-gateway"
	"os"
)

var (
	grpcserver = flag.String("grpcserver", os.Getenv("GRPC_SERVER_ADDRESS"), "grpc server for your services")
	gwserver   = flag.String("gwserver", os.Getenv("GW_SERVER_ADDRESS"), "Address and port for the gateway")
)

func main() {
	zerolog.TimestampFieldName = "@timestamp"
	zerolog.LevelFieldName = "log.level"
	zerolog.MessageFieldName = "message"

	backendAddr := *grpcserver // The grpc server addr
	exposedArr := *gwserver    // The addr of the exposed api
	if exposedArr == "" {
		log.Fatal().
			Str("log.logger", "grpc gateway").
			Str("labels.category", "APP").
			Msgf("env GW_SERVER_ADDRESS not set %s", exposedArr)
	}

	if backendAddr == "" {
		log.Fatal().
			Str("log.logger", "grpc gateway").
			Str("labels.category", "APP").
			Msgf("env GRPC_SERVER_ADDRESS not set %s", backendAddr)
	}

	log.Info().
		Str("log.logger", "grpc gateway").
		Str("labels.category", "APP").
		Msgf("grpc gateway started on %s", exposedArr)

	log.Info().
		Str("log.logger", "grpc gateway").
		Str("labels.category", "APP").
		Str("server.address", backendAddr).
		Msgf("grpc gateway connects to %s", backendAddr)

	grpc_gateway.Run(backendAddr, exposedArr)
}
