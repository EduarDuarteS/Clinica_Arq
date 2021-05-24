package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"apiHistoriaClinica/graph/generated"
	"apiHistoriaClinica/graph/model"
	"context"
	"log"
	"os"

  "github.com/aws/aws-sdk-go-v2/aws"
  "github.com/aws/aws-sdk-go-v2/config"
  "github.com/aws/aws-sdk-go-v2/service/dynamodb"
  "github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
  "github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
)

func (r *queryResolver) HistoriaClinicaPaciente(ctx context.Context, cedula string) (*model.Cronologia, error) {

  incidencias, err := getIncidencias(cedula)

  if err != nil {
    return nil, err
  }

  return &model.Cronologia{
    Paciente: getPaciente(cedula),
    Incidencias: incidencias,
  }, nil
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }


func getIncidencias(cedula string) ([]*model.Incidencia, error) {
  cfg, err := config.LoadDefaultConfig(context.TODO())
  if err != nil {
    panic(err)
  }
  tableName := aws.String(os.Getenv("TABLE_NAME"))
  client := dynamodb.NewFromConfig(cfg)

  filt := expression.Name("Cedula").Equal(expression.Value(cedula))

  expr, err := expression.NewBuilder().WithFilter(filt).Build()
  if err != nil {
    return nil, err
  }

  result, err := client.Scan(context.TODO(), &dynamodb.ScanInput{
    TableName: tableName,
    FilterExpression: expr.Filter(),
    ExpressionAttributeNames: expr.Names(),
    ExpressionAttributeValues: expr.Values(),
  })
  if err != nil {
    return nil, err
  }

  log.Println(result)
  var ans []*model.Incidencia

  type resultS struct {
    ID string
    Nombre string
    Cedula string
    Valor int
    Resultado string
    Fecha string
  }

  for _, i := range result.Items {
    item := &model.Incidencia{}
    resultLine := &resultS{}

    err = attributevalue.UnmarshalMap(i, &resultLine)

    if err != nil {
      log.Fatalf("Got error unmarshalling: %s", err)
    }

    log.Println(resultLine, "resss")

    item.ID = resultLine.ID
    item.Nombre = resultLine.Nombre
    item.Fecha = resultLine.Fecha

    ans = append(ans, item)
  }


  return ans, nil
}

func getPaciente(cedula string) *model.Paciente {
  return &model.Paciente{}
}
