// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package todosservicepb

import (
	context "context"
	todos "github.com/theNorstroem/todo-management-tool/api/dist/pb/todos"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// TodosServiceClient is the client API for TodosService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type TodosServiceClient interface {
	// Adds a new ToDos item to the ToDos list
	CreateTodo(ctx context.Context, in *CreateTodoRequest, opts ...grpc.CallOption) (*todos.ItemEntity, error)
	// The Get method takes zero or more parameters, and returns a todos.ItemEntity which contains a todos.Item
	GetTodo(ctx context.Context, in *GetTodoRequest, opts ...grpc.CallOption) (*todos.ItemEntity, error)
	// The List method takes zero or more parameters as input, and returns a todos.ItemCollection of todos.ItemEntity that match the input parameters.
	ListTodos(ctx context.Context, in *ListTodosRequest, opts ...grpc.CallOption) (*todos.ItemEntity, error)
	// The Get method takes zero or more parameters, and returns a todos.ItemEntity which contains a todos.Item
	UpdateTodo(ctx context.Context, in *UpdateTodoRequest, opts ...grpc.CallOption) (*todos.ItemEntity, error)
}

type todosServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewTodosServiceClient(cc grpc.ClientConnInterface) TodosServiceClient {
	return &todosServiceClient{cc}
}

func (c *todosServiceClient) CreateTodo(ctx context.Context, in *CreateTodoRequest, opts ...grpc.CallOption) (*todos.ItemEntity, error) {
	out := new(todos.ItemEntity)
	err := c.cc.Invoke(ctx, "/todosservice.TodosService/CreateTodo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *todosServiceClient) GetTodo(ctx context.Context, in *GetTodoRequest, opts ...grpc.CallOption) (*todos.ItemEntity, error) {
	out := new(todos.ItemEntity)
	err := c.cc.Invoke(ctx, "/todosservice.TodosService/GetTodo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *todosServiceClient) ListTodos(ctx context.Context, in *ListTodosRequest, opts ...grpc.CallOption) (*todos.ItemEntity, error) {
	out := new(todos.ItemEntity)
	err := c.cc.Invoke(ctx, "/todosservice.TodosService/ListTodos", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *todosServiceClient) UpdateTodo(ctx context.Context, in *UpdateTodoRequest, opts ...grpc.CallOption) (*todos.ItemEntity, error) {
	out := new(todos.ItemEntity)
	err := c.cc.Invoke(ctx, "/todosservice.TodosService/UpdateTodo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// TodosServiceServer is the server API for TodosService service.
// All implementations must embed UnimplementedTodosServiceServer
// for forward compatibility
type TodosServiceServer interface {
	// Adds a new ToDos item to the ToDos list
	CreateTodo(context.Context, *CreateTodoRequest) (*todos.ItemEntity, error)
	// The Get method takes zero or more parameters, and returns a todos.ItemEntity which contains a todos.Item
	GetTodo(context.Context, *GetTodoRequest) (*todos.ItemEntity, error)
	// The List method takes zero or more parameters as input, and returns a todos.ItemCollection of todos.ItemEntity that match the input parameters.
	ListTodos(context.Context, *ListTodosRequest) (*todos.ItemEntity, error)
	// The Get method takes zero or more parameters, and returns a todos.ItemEntity which contains a todos.Item
	UpdateTodo(context.Context, *UpdateTodoRequest) (*todos.ItemEntity, error)
	mustEmbedUnimplementedTodosServiceServer()
}

// UnimplementedTodosServiceServer must be embedded to have forward compatible implementations.
type UnimplementedTodosServiceServer struct {
}

func (UnimplementedTodosServiceServer) CreateTodo(context.Context, *CreateTodoRequest) (*todos.ItemEntity, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateTodo not implemented")
}
func (UnimplementedTodosServiceServer) GetTodo(context.Context, *GetTodoRequest) (*todos.ItemEntity, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTodo not implemented")
}
func (UnimplementedTodosServiceServer) ListTodos(context.Context, *ListTodosRequest) (*todos.ItemEntity, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListTodos not implemented")
}
func (UnimplementedTodosServiceServer) UpdateTodo(context.Context, *UpdateTodoRequest) (*todos.ItemEntity, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateTodo not implemented")
}
func (UnimplementedTodosServiceServer) mustEmbedUnimplementedTodosServiceServer() {}

// UnsafeTodosServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to TodosServiceServer will
// result in compilation errors.
type UnsafeTodosServiceServer interface {
	mustEmbedUnimplementedTodosServiceServer()
}

func RegisterTodosServiceServer(s grpc.ServiceRegistrar, srv TodosServiceServer) {
	s.RegisterService(&TodosService_ServiceDesc, srv)
}

func _TodosService_CreateTodo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateTodoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TodosServiceServer).CreateTodo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/todosservice.TodosService/CreateTodo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TodosServiceServer).CreateTodo(ctx, req.(*CreateTodoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _TodosService_GetTodo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetTodoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TodosServiceServer).GetTodo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/todosservice.TodosService/GetTodo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TodosServiceServer).GetTodo(ctx, req.(*GetTodoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _TodosService_ListTodos_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListTodosRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TodosServiceServer).ListTodos(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/todosservice.TodosService/ListTodos",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TodosServiceServer).ListTodos(ctx, req.(*ListTodosRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _TodosService_UpdateTodo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateTodoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TodosServiceServer).UpdateTodo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/todosservice.TodosService/UpdateTodo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TodosServiceServer).UpdateTodo(ctx, req.(*UpdateTodoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// TodosService_ServiceDesc is the grpc.ServiceDesc for TodosService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var TodosService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "todosservice.TodosService",
	HandlerType: (*TodosServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "CreateTodo",
			Handler:    _TodosService_CreateTodo_Handler,
		},
		{
			MethodName: "GetTodo",
			Handler:    _TodosService_GetTodo_Handler,
		},
		{
			MethodName: "ListTodos",
			Handler:    _TodosService_ListTodos_Handler,
		},
		{
			MethodName: "UpdateTodo",
			Handler:    _TodosService_UpdateTodo_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "todosservice/todosservice.proto",
}
