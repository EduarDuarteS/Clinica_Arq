const Cuenta = require("../models/cuenta")
const sqs = require("../settings/sqs")

let saveToDb = async (bodyCuenta) => {

    let cuenta = await Cuenta.create({
        ...bodyCuenta
    })
    cuenta.save()
}

const queueURL = process.env.URL_QUEUE
const params = {
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
}

let getMessageFromQueue = async () => {
    sqs.receiveMessage(params, async function(err, data) {
        if(err) {
            console.log("Receive Error in queue", err)
        }else if(data.Messages) {
            console.log("Message incoming")
            let body = JSON.parse(data.Messages[0].Body)
            
            //TODO: save body to db and send to blockchain

            await saveToDb(body);
            
            //Delete message
            let deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: data.Messages[0].ReceiptHandle
            }
            sqs.deleteMessage(deleteParams, function(err1, data1) {
                if (err1) {
                    console.log("Delete Error", err1)
                } else {
                    console.log("Message Deleted", data1)
                }
            })
        } else {
            console.log("No messages in queue")
        }
    })
}

module.exports = {saveToDb, getMessageFromQueue}