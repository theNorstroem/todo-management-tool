name: TodosService
version: ""
description: Specification of the ToDos related services.
lifecycle: null
__proto:
    package: todosservice
    targetfile: todosservice.proto
    imports:
        - google/api/annotations.proto
        - todosservice/reqmsgs.proto
        - google/protobuf/empty.proto
        - todos/todos.proto
    options:
        go_package: github.com/theNorstroem/todo-management-tool/api/dist/pb/todosservice;todosservicepb
        java_multiple_files: "true"
        java_outer_classname: TodosserviceProto
        java_package: com.github.thenorstroem.todo.management.api.todosservice
services:
    Create:
        description: Adds a new ToDos item to the ToDos list
        data:
            request: todos.Item
            response: todos.ItemEntity
            bodyfield: body
        deeplink:
            description: 'Create: POST /todos todos.Item, todos.ItemEntity #Adds a new ToDos item to the ToDos list'
            href: /todos
            method: POST
            rel: create
        query: {}
        rpc_name: CreateTodo
    List:
        description: The List method takes zero or more parameters as input, and returns a todos.ItemCollection of todos.ItemEntity that match the input parameters.
        data:
            request: google.protobuf.Empty
            response: todos.ItemCollection
            bodyfield: body
        deeplink:
            description: 'List: GET /todos google.protobuf.Empty, todos.ItemCollection #The List method takes zero or more parameters as input, and returns a todos.ItemCollection of todos.ItemEntity that match the input parameters.'
            href: /todos
            method: GET
            rel: list
        query: {}
        rpc_name: ListTodos
    Get:
        description: The Get method takes zero or more parameters, and returns a todos.ItemEntity which contains a todos.Item
        data:
            request: google.protobuf.Empty
            response: todos.ItemEntity
            bodyfield: body
        deeplink:
            description: 'Get: GET /todos/{tdi} google.protobuf.Empty, todos.ItemEntity #The Get method takes zero or more parameters, and returns a todos.ItemEntity which contains a todos.Item'
            href: /todos/{tdi}
            method: GET
            rel: self
        query:
            tdi:
                constraints: {}
                description: The query param **tdi** stands for the item id.
                meta: null
                type: string
        rpc_name: GetTodo
    Update:
        description: The Get method takes zero or more parameters, and returns a todos.ItemEntity which contains a todos.Item
        data:
            request: todos.Item
            response: todos.ItemEntity
            bodyfield: body
        deeplink:
            description: 'Update: PATCH /todos/{tdi} todos.Item, todos.ItemEntity #The Get method takes zero or more parameters, and returns a todos.ItemEntity which contains a todos.Item'
            href: /todos/{tdi}
            method: PATCH
            rel: update
        query:
            tdi:
                constraints: {}
                description: The query param **tdi** stands for the item id.
                meta: null
                type: string
        rpc_name: UpdateTodo
