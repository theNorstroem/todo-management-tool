name: ItemEntity
type: ItemEntity
description: Entitycontainer which holds a todos.Item
lifecycle: null
__proto:
    package: todos
    targetfile: todos.proto
    imports:
        - furo/furo.proto
    options:
        go_package: github.com/theNorstroem/todo-management-tool/dist/pb/todos;todospb
        java_multiple_files: "true"
        java_outer_classname: TodosProto
        java_package: com.github.thenorstroem.todo.management.bff.todos
fields:
    data:
        type: todos.Item
        description: the data contains a todos.Item
        __proto:
            number: 1
        __ui: null
        meta:
            default: ""
            placeholder: todos.itementity.data.placeholder
            hint: ""
            label: todos.itementity.data.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints: {}
    links:
        type: furo.Link
        description: the Hateoas links
        __proto:
            number: 2
        __ui: null
        meta:
            default: ""
            placeholder: todos.itementity.links.placeholder
            hint: ""
            label: todos.itementity.links.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: true
            typespecific: null
        constraints: {}
    meta:
        type: furo.Meta
        description: Meta for the response
        __proto:
            number: 3
        __ui: null
        meta:
            default: ""
            placeholder: todos.itementity.meta.placeholder
            hint: ""
            label: todos.itementity.meta.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints: {}
