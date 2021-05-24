const express = require("express")
const { ApolloServer, gql } = require("apollo-server")
const app = express()
const schedule = require("node-schedule")
const {saveToDb, getMessageFromQueue} = require("./services/queue")
const port = 8080
const sequelize = require("./settings/sequelize")
const Cuenta = require("./models/cuenta")

const cors = require('cors')

app.use(cors())

//await sequelize.sync({alter: true})

const typeDefs = gql`
scalar Date

schema {
  query: Query
}

type Query {
  getCuentas: [Cuenta!]
  getCuentasClinica(idClinica: String!): [Cuenta!]
  getCuenta(id: ID!): Cuenta
}

type Cuenta {
  id: ID!
  idClinica: String!
  cedulaPaciente: String!
  tipo: String!
  fecha: Date!
  valor: Float!
}`

//No Id required
const cuentas = [
    {
        idClinica: "A",
        cedulaPaciente: "107895446",
        tipo: "dasf",
        fecha: Date.now(),
        valor: 25.20
    },
    {
        idClinica: "A",
        cedulaPaciente: "107895446",
        tipo: "dasf",
        fecha: Date.now(),
        valor: 25.20
    },
    {
        idClinica: "B",
        cedulaPaciente: "107895446",
        tipo: "dasf",
        fecha: Date.now(),
        valor: 25.20
    }
]

const resolvers = {
    Query:{
        getCuentas: () => Cuenta.findAll(),
        getCuentasClinica: (parent, args, context, info) => Cuenta.findAll({where: {idClinica: args.idClinica}}),
        getCuenta: (parent, args, context, info) => Cuenta.findOne({where: {id: args.id}, limit: 1})
      }
}

//funcion que devuelve el schema
const server = new ApolloServer({ typeDefs, resolvers })

schedule.scheduleJob('*/5 * * * * *', function() {
    //console.log("Looking for messages")
})

saveToDb(cuentas[0])
saveToDb({
  idClinica: "B",
  cedulaPaciente: "107895446",
  tipo: "dasf",
  fecha: Date.now(),
  valor: 25.20
})
saveToDb({
  idClinica: "B",
  cedulaPaciente: "107895446",
  tipo: "dasf",
  fecha: Date.now(),
  valor: 25.20
})

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
