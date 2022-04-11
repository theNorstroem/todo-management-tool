name: Item
type: Item
description: Simple ToDos Item Type
lifecycle: null
__proto:
    package: todos
    targetfile: todos.proto
    imports:
        - google/type/date.proto
    options:
        go_package: github.com/theNorstroem/todo-management-tool/api/dist/pb/todos;todospb
        java_multiple_files: "true"
        java_outer_classname: TodosProto
        java_package: com.github.thenorstroem.todo.management.api.todos
fields:
    id:
        type: string
        description: Identity of the item
        __proto:
            number: 1
        __ui: null
        meta:
            default: ""
            placeholder: todos.item.id.placeholder
            hint: ""
            label: todos.item.id.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints: {}
    description:
        type: string
        description: Description of the task
        __proto:
            number: 2
        __ui: null
        meta:
            default: ""
            placeholder: todos.item.description.placeholder
            hint: ""
            label: todos.item.description.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints:
            min:
                is: "12"
                message: todos.item.description.constraints.min
    due_date:
        type: google.type.Date
        description: Due date of the task
        __proto:
            number: 3
        __ui: null
        meta:
            default: ""
            placeholder: todos.item.duedate.placeholder
            hint: ""
            label: todos.item.duedate.label
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints:
            required:
                is: "true"
                message: due_date is required
