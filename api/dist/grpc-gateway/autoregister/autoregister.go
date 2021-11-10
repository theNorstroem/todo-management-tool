package autoregister

import (
	"context"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	//todosservice.TodosService
	todosservicepb "github.com/theNorstroem/todo-management-tool/api/dist/pb/todosservice"

	"google.golang.org/grpc"
)

func RegisterAllEndpoints(grpcBackendAddr string, ctx context.Context, mux *runtime.ServeMux, opts []grpc.DialOption) error {
	var err error
	// todosservice.TodosService
	err = todosservicepb.RegisterTodosServiceHandlerFromEndpoint(ctx, mux, grpcBackendAddr, opts)
	if err != nil {
		return err
	}

	//installed services
	return err
}
