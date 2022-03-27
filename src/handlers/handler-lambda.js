const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb')

exports.handler = async (event, context) => {
  console.log(event, context)
  const eventId = "test"
  const payload = {something: "somethingelse"}

  const sqsClient = new SQSClient({ region: "us-east-1", endpoint: "http://localstack:4566" })
  const ddbClient = new DynamoDBClient({ region: "us-east-1", endpoint: "http://localstack:4566" })
  const document = new DynamoDBDocument(ddbClient)

  const output = await document.put({ Item: { eventId: eventId, payload: JSON.stringify(payload) }, TableName: "events" })
  console.log(output)

  const command = new SendMessageCommand({
    MessageBody: eventId,
    QueueUrl: "http://localhost:4566/000000000000/events"
  })
  const sqsOutput = await sqsClient.send(command)
  console.log(sqsOutput)

  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
}
