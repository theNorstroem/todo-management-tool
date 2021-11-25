package main

import (
	"flag"
	"fmt"
	environment "github.com/theNorstroem/todo-management-tool/grpc-backend/internal/env"
	todogrpc "github.com/theNorstroem/todo-management-tool/grpc-backend/internal/todo"
	"google.golang.org/grpc"
	"log"
	"net"
)

var (
	port = flag.Int("port", 7070, "The server port")
)

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	environment.InitEnv()

	todogrpc.Register()
	todogrpc.RegisterServiceServer(s, todogrpc.GetServiceServer())

	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
