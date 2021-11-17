package todo

import (
	"context"
	"fmt"
	"github.com/oklog/ulid"
	todos "github.com/theNorstroem/todo-management-tool/api/dist/pb/todos"
	proto "github.com/theNorstroem/todo-management-tool/api/dist/pb/todosservice"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
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

	item, err := CreateToDoItem(mapCreateRequestBodyToTodoItem(request))
	if err != nil {
		return nil, newBadRequestError(err.Error())
	}
	return mapItemToItemEntity(item), err
}

func (s serviceServer) GetTodo(ctx context.Context, request *proto.GetTodoRequest) (*todos.ItemEntity, error) {

	ident, _ := ulid.Parse(request.Tdi)
	item, err := GetToDoItem(ident)
	if err != nil {
		return nil, newBadRequestError(err.Error())
	}
	return mapItemToItemEntity(item), err
}

func (s serviceServer) ListTodos(ctx context.Context, request *proto.ListTodosRequest) (*todos.ItemCollection, error) {

	items, err := ListToDoItems()
	if err != nil {
		return nil, newBadRequestError(err.Error())
	}
	return mapItemsToItemCollcetion(items), err
}

func (s serviceServer) UpdateTodo(ctx context.Context, request *proto.UpdateTodoRequest) (*todos.ItemEntity, error) {

	ident, _ := ulid.Parse(request.Tdi)
	item, err := UpdateToDoItem(ident, mapUpdateRequestBodyToTodoItem(request))
	if err != nil {
		return nil, newBadRequestError(err.Error())
	}
	return mapItemToItemEntity(item), err
}

// builds a universal Unimplemented error with google.rpc.Status with LocalizedMessage as a detail
func newUnimplementedError(msg string) error {
	st := status.New(codes.Unimplemented, "This service endpoint is not yet available")
	v := &errdetails.LocalizedMessage{
		Locale:  "en-GB",
		Message: msg,
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

// builds a universal FailedPrecondition error with google.rpc.Status with LocalizedMessage as a detail
func newBadRequestError(msg string) error {
	st := status.New(codes.FailedPrecondition, "Failed precondition")
	v := &errdetails.LocalizedMessage{
		Locale:  "en-GB",
		Message: msg,
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
