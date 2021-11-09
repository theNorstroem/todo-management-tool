package autoregister
{{$config := .config}}{{$importlist := dict }}
import (
    "context"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	{{- range $servicename, $service:= .services}}
	{{- $pkgopts := split ";" $service.__proto.options.go_package }}
	//{{$servicename}}
	{{- if hasKey $importlist $pkgopts._1 | not}}
	{{$pkgopts._1}} "{{$pkgopts._0}}"
    {{end}}
    {{- $_ := set $importlist $pkgopts._1 "imported"}}{{- end}}
{{- range $servicename, $service:= .installedServices}}
//Installed service {{$servicename}}
	{{- $pkgopts := split ";" $service.__proto.options.go_package }}
	{{- if hasKey $importlist $pkgopts._1 | not}}
	{{$pkgopts._1}} "{{$pkgopts._0}}"
    {{end}}
    {{- $_ := set $importlist $pkgopts._1 "imported"}}
{{- end}}
	"google.golang.org/grpc"
)

func RegisterAllEndpoints(grpcBackendAddr string, ctx context.Context, mux *runtime.ServeMux, opts []grpc.DialOption) error {
	var err error
{{- range $servicename, $service:= .services}}
{{- $pkgopts := split ";" $service.__proto.options.go_package }}
	// {{$servicename}}
	err = {{$pkgopts._1}}.Register{{$service.name}}HandlerFromEndpoint(ctx, mux, grpcBackendAddr, opts)
	if err != nil {
		return err
	}
{{end}}

//installed services
{{- range $servicename, $service:= .installedServices}}
{{- $pkgopts := split ";" $service.__proto.options.go_package }}
	// {{$servicename}}
	err = {{$pkgopts._1}}.Register{{$service.name}}HandlerFromEndpoint(ctx, mux, grpcBackendAddr, opts)
	if err != nil {
		return err
	}
{{end}}
	return err
}
