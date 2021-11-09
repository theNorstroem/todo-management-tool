name: GetTodoRequest
type: GetTodoRequest
description: request message for GetTodo
lifecycle: null
__proto:
    package: todosservice
    targetfile: reqmsgs.proto
    imports:
        - google/protobuf/empty.proto
    options:
        go_package: github.com/theNorstroem/todo-management-tool/dist/pb/todosservice;todosservicepb
        java_multiple_files: "true"
        java_outer_classname: ReqmsgsProto
        java_package: com.github.thenorstroem.todo.management.bff.todosservice
fields:
    body:
        type: .google.protobuf.Empty
        description: Body with google.protobuf.Empty
        __proto:
            number: 1
        __ui: null
        meta:
            default: ""
            placeholder: todosservice.gettodorequest.body.placeholder
            hint: ""
            label: todosservice.gettodorequest.body.label
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
            placeholder: todosservice.gettodorequest.tdi.placeholder
            hint: ""
            label: todosservice.gettodorequest.tdi.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints: {}
