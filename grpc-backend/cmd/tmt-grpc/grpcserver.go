package main

import (
	"flag"
	"fmt"
	todo "github.com/theNorstroem/todo-management-tool/grpc-backend/cmd/internal/todo"
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

	todo.RegisterServiceServer(s, todo.GetServiceServer())
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
