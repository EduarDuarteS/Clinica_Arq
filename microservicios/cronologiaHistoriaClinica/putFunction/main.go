package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type Input struct {
  ID string `json:"id"`
  Nombre string `json:"nombre"`
  Cedula string `json:"cedula"`
  Valor int `json:"valor"`
  Resultado string `json:"resultado"`
  Fecha string `json:"fecha"`
}

func handler(ctx context.Context, sqsEvent events.SQSEvent) error {
  cfg, err := config.LoadDefaultConfig(context.TODO())
  if err != nil {
    panic(err)
  }

  client := dynamodb.NewFromConfig(cfg)

  fmt.Println(sqsEvent.Records)
  for _, message := range sqsEvent.Records {
    var input Input
    if err := json.Unmarshal([]byte(message.Body), &input); err != nil {
      fmt.Println(err)
      return err
    }

    item, err := attributevalue.MarshalMap(input)

    fmt.Println(item)

    res, err := client.PutItem(ctx, &dynamodb.PutItemInput{
      TableName: aws.String(os.Getenv("TABLE_NAME")),
      Item: item,
    })
    if err != nil {
      fmt.Println(err)
      return err
    }

    fmt.Println(res)
  }

  return nil
}

func main() {
  lambda.Start(handler)
}

const sample = `
{
"id": "id",
"nombre": "nombre",
"cedula": "cedula",
"valor": 123,
"resultado": "ress",
"fecha": "21/10/21" 
}
`
