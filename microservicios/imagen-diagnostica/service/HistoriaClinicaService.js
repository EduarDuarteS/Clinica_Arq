'use strict';

const sqs = require("../settings/sqs")
const moment = require("moment")

let sendToQueue = (message) => {
  let params = {
    // Remove DelaySeconds parameter and value for FIFO queues
   DelaySeconds: 10,
   MessageAttributes: {
     "Title": {
       DataType: "String",
       StringValue: "The Whistler"
     },
     "Author": {
       DataType: "String",
       StringValue: "John Grisham"
     },
     "WeeksOn": {
       DataType: "Number",
       StringValue: "6"
     }
   },
   MessageBody: message,
   // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
   // MessageGroupId: "Group1",  // Required for FIFO queues
   QueueUrl: process.env.URL_QUEUE
  };
  
  sqs.sendMessage(params, function(err, data) {
   if (err) {
     console.log("Error", err);
   } else {
     console.log("Success", data.MessageId);
   }
  });
}

/**
 * agregar un procedimiento a un paciente
 * 
 *
 * body Procedimiento procedimiento que desea agregarle al paciente
 * cedula String cedula del paciente al cual se le va a agregar el procedimiento
 * no response value expected for this operation
 **/
exports.addProcedimientoHistoriaClinica = function(body,cedula) {
  return new Promise(function(resolve, reject) {

    let valor = body.valor
    let fecha = "2021-05-24T01:46:31.000Z"
    let cedulaPaciente = cedula
    let idClinica = "ClinicaA"
    let tipo = body.nombre

    let cuenta = {idClinica, cedulaPaciente, tipo, fecha, valor}

    sendToQueue(JSON.stringify(cuenta))
    resolve("OK");
  });
}

