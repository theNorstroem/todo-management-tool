name: ItemCollection
type: ItemCollection
description: Collectioncontainer which holds items of type todos.ItemEntity
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
    meta:
        type: furo.Meta
        description: Meta for the response
        __proto:
            number: 3
        __ui: null
        meta:
            default: ""
            placeholder: todos.itemcollection.meta.placeholder
            hint: ""
            label: todos.itemcollection.meta.label
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
            placeholder: todos.itemcollection.links.placeholder
            hint: ""
            label: todos.itemcollection.links.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: true
            typespecific: null
        constraints: {}
    entities:
        type: todos.ItemEntity
        description: the data contains a todos.Item
        __proto:
            number: 1
        __ui: null
        meta:
            default: ""
            placeholder: todos.itemcollection.entities.placeholder
            hint: ""
            label: todos.itemcollection.entities.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: true
            typespecific: null
        constraints: {}
