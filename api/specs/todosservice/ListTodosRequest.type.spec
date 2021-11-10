name: ListTodosRequest
type: ListTodosRequest
description: request message for ListTodos
lifecycle: null
__proto:
    package: todosservice
    targetfile: reqmsgs.proto
    imports:
        - google/protobuf/empty.proto
    options:
        go_package: github.com/theNorstroem/todo-management-tool/api/dist/pb/todosservice;todosservicepb
        java_multiple_files: "true"
        java_outer_classname: ReqmsgsProto
        java_package: com.github.thenorstroem.todo.management.api.todosservice
fields:
    body:
        type: .google.protobuf.Empty
        description: Body with google.protobuf.Empty
        __proto:
            number: 1
        __ui: null
        meta:
            default: ""
            placeholder: todosservice.listtodosrequest.body.placeholder
            hint: ""
            label: todosservice.listtodosrequest.body.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints: {}
