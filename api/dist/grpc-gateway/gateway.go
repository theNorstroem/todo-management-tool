package transcoder

import (
	"context"
	"github.com/cheapRoc/grpc-zerolog"
	"github.com/grpc-ecosystem/go-grpc-middleware/tracing/opentracing"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/opentracing/opentracing-go"
	"github.com/opentracing/opentracing-go/ext"
	"github.com/rs/zerolog"
	"github.com/theNorstroem/todo-management-tool/api/dist/grpc-gateway/autoregister"
	_ "google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/metadata"
	"google.golang.org/protobuf/encoding/protojson"
	"net/http"
	"os"
	"strings"
)

var grpcGatewayTag = opentracing.Tag{Key: string(ext.Component), Value: "grpc-gateway"}

// headers direction client without prefix
func outgoingMatcher(headerName string) (mdName string, ok bool) {
	return headerName, true
}

// headers direction server without prefix
func incomingMatcher(headerName string) (mdName string, ok bool) {
	if strings.EqualFold(headerName, "content-length") {
		return headerName, false
	}
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection
	if strings.EqualFold(headerName, "connection") {
		return headerName, false
	}
	if strings.EqualFold(headerName, "keep-alive") {
		return headerName, false
	}
	return headerName, true
}

// sets header api-base-url
func addBaseUrl(ctx context.Context, request *http.Request) metadata.MD {
	return metadata.New(map[string]string{
		"api-base-url": "//" + request.Host,
	})
}

func tracingWrapper(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		parentSpanContext, err := opentracing.GlobalTracer().Extract(
			opentracing.HTTPHeaders,
			opentracing.HTTPHeadersCarrier(r.Header))
		if err == nil || err == opentracing.ErrSpanContextNotFound {
			serverSpan := opentracing.GlobalTracer().StartSpan(
				"ServeHTTP",
				// this is magical, it attaches the new span to the parent parentSpanContext, and creates an unparented one if empty.
				ext.RPCServerOption(parentSpanContext),
				grpcGatewayTag,
			)
			r = r.WithContext(opentracing.ContextWithSpan(r.Context(), serverSpan))
			defer serverSpan.Finish()
		}
		h.ServeHTTP(w, r)
	})
}

func Run(grpcBackendAddr string, transcoderAddr string) error {

	logger := zerolog.New(os.Stdout).With().Timestamp().Logger()
	logger = logger.With().
		Str("labels.category", "APP").
		Str("log.logger", "grpc gateway").Logger()

	grpclog.SetLoggerV2(grpczerolog.New(logger))

	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux(
		runtime.WithOutgoingHeaderMatcher(outgoingMatcher),
		runtime.WithIncomingHeaderMatcher(incomingMatcher),
		runtime.WithMetadata(addBaseUrl),
		runtime.WithMarshalerOption(runtime.MIMEWildcard, &runtime.HTTPBodyMarshaler{
			Marshaler: &runtime.JSONPb{
				MarshalOptions: protojson.MarshalOptions{
					UseProtoNames:   true,
					EmitUnpopulated: false,
				},
				UnmarshalOptions: protojson.UnmarshalOptions{
					DiscardUnknown: true,
				},
			},
		}))

	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithUnaryInterceptor(
			grpc_opentracing.UnaryClientInterceptor(
				grpc_opentracing.WithTracer(opentracing.GlobalTracer()),
			),
		),
	}

	err := autoregister.RegisterAllEndpoints(grpcBackendAddr, ctx, mux, opts)
	if err != nil {
		return err
	}

	return http.ListenAndServe(transcoderAddr, tracingWrapper(mux))
}
