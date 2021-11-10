name: UpdateTodoRequest
type: UpdateTodoRequest
description: request message for UpdateTodo
lifecycle: null
__proto:
    package: todosservice
    targetfile: reqmsgs.proto
    imports:
        - todos/todos.proto
    options:
        go_package: github.com/theNorstroem/todo-management-tool/api/dist/pb/todosservice;todosservicepb
        java_multiple_files: "true"
        java_outer_classname: ReqmsgsProto
        java_package: com.github.thenorstroem.todo.management.api.todosservice
fields:
    body:
        type: .todos.Item
        description: Body with todos.Item
        __proto:
            number: 1
        __ui: null
        meta:
            default: ""
            placeholder: todosservice.updatetodorequest.body.placeholder
            hint: ""
            label: todosservice.updatetodorequest.body.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints: {}
    tdi:
        type: string
        description: The query param **tdi** stands for the item id.
        __proto:
            number: 2
        __ui: null
        meta:
            default: ""
            placeholder: todosservice.updatetodorequest.tdi.placeholder
            hint: ""
            label: todosservice.updatetodorequest.tdi.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints: {}
