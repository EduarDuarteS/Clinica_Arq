package main

import (
	"apiHistoriaClinica/graph"
	"apiHistoriaClinica/graph/generated"
  "context"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"

  "github.com/go-chi/chi"
  chiadapter "github.com/awslabs/aws-lambda-go-api-proxy/chi"
  "github.com/aws/aws-lambda-go/events"
  "github.com/aws/aws-lambda-go/lambda"
)


var chiLambda *chiadapter.ChiLambda

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
  if chiLambda  == nil {
    router := chi.NewRouter()
    srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

    router.Handle("/api-historia-clinica/playground", playground.Handler("GraphQL playground", "/api-historia-clinica/query"))
    router.Handle("/api-historia-clinica/query", srv)

    chiLambda = chiadapter.New(router)
  }

  return chiLambda.ProxyWithContext(ctx, req)
}


func main() {
 lambda.Start(Handler)
}


const q = `
{
  historiaClinicaPaciente(cedula: "cedula"){
    incidencias{
      id
      tipo
      nombre
      descripcion
      fecha
    }
  }
}
`
