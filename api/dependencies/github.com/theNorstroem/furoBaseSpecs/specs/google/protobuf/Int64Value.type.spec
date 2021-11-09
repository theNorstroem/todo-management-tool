name: Int64Value
type: Int64Value
description: |-
    Wrapper message for `int64`.

     The JSON representation for `Int64Value` is JSON string.
__proto:
    package: google.protobuf
    targetfile: wrappers.proto
    imports: []
    options:
        cc_enable_arenas: "true"
        csharp_namespace: Google.Protobuf.WellKnownTypes
        go_package: google.golang.org/protobuf/types/known/wrapperspb
        java_multiple_files: "true"
        java_outer_classname: WrappersProto
        java_package: com.google.protobuf
        objc_class_prefix: GPB
fields:
    value:
        type: int64
        description: The int64 value.
        __proto:
            number: 1
            oneof: ""
        __ui:
            component: ""
            flags: []
            noinit: false
            noskip: false
        meta:
            default: ""
            hint: ""
            label: label.Int64Value.value
            options:
                flags: []
                list: []
            readonly: false
            repeated: false
            typespecific: null
        constraints: {}
