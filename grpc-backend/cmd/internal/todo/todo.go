package todosservicepb

import (
	"context"
	"fmt"
	todos "github.com/theNorstroem/todo-management-tool/dist/pb/todo"
	proto "github.com/theNorstroem/todo-management-tool/dist/pb/todosservice"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/genproto/googleapis/type/date"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var RegisterServiceServer = proto.RegisterTodosServiceServer

func GetServiceServer() proto.TodosServiceServer {
	var s serviceServer
	return &s
}

type serviceServer struct {
	proto.UnimplementedTodosServiceServer
}

func (s serviceServer) mustEmbedUnimplementedTodosServiceServer() {
	panic("implement me")
}

func (s serviceServer) CreateTodo(ctx context.Context, request *proto.CreateTodoRequest) (*todos.ItemEntity, error) {

	return &todos.ItemEntity{Data: &todos.Item{
		Id:          "01FM0109NRRFM5VKEK6VBJ19AZ",
		Description: "Dummy ToDo task",
		DueDate: &date.Date{
			Year:  2021,
			Month: 11,
			Day:   8,
		},
	}}, nil

}

func (s serviceServer) GetTodo(ctx context.Context, request *proto.GetTodoRequest) (*todos.ItemEntity, error) {
	return nil, newUnimplementedError()
}

func (s serviceServer) ListTodos(ctx context.Context, request *proto.ListTodosRequest) (*todos.ItemEntity, error) {
	return nil, newUnimplementedError()
}

func (s serviceServer) UpdateTodo(ctx context.Context, request *proto.UpdateTodoRequest) (*todos.ItemEntity, error) {
	return nil, newUnimplementedError()
}

// builds a universal unimplemented google.rpc.Status with LocalizedMessage as a detail
func newUnimplementedError() error {
	st := status.New(codes.Unimplemented, "This service endpoint is not yet available")
	v := &errdetails.LocalizedMessage{
		Locale:  "en-GB",
		Message: "Sorry. The ListTodos service will be soon available",
	}
	st, err := st.WithDetails(v)
	if err != nil {
		// If this errored, it will always error
		// here, so better panic so we can figure
		// out why than have this silently passing.
		panic(fmt.Sprintf("Unexpected error attaching metadata: %v", err))
	}
	return st.Err()
}
