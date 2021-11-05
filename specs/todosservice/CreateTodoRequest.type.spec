name: CreateTodoRequest
type: CreateTodoRequest
description: request message for CreateTodo
lifecycle: null
__proto:
    package: todosservice
    targetfile: reqmsgs.proto
    imports:
        - todos/todos.proto
    options:
        go_package: github.com/theNorstroem/todo-management-tool/dist/pb/todosservice;todosservicepb
        java_multiple_files: "true"
        java_outer_classname: ReqmsgsProto
        java_package: com.github.thenorstroem.todo.management.bff.todosservice
fields:
    body:
        type: .todos.Item
        description: Body with todos.Item
        __proto:
            number: 1
        __ui: null
        meta:
            default: ""
            placeholder: todosservice.createtodorequest.body.placeholder
            hint: ""
            label: todosservice.createtodorequest.body.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints: {}
