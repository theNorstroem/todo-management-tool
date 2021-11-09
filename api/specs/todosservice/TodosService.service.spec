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
        - todos/todos.proto
    options:
        go_package: github.com/theNorstroem/todo-management-tool/dist/pb/todosservice;todosservicepb
        java_multiple_files: "true"
        java_outer_classname: TodosserviceProto
        java_package: com.github.thenorstroem.todo.management.bff.todosservice
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
