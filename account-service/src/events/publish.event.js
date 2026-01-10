import connectRabbitMQ from "../config/rabbitmq.js";

async function publishDebitResult(type, payload) {
  const channel = await connectRabbitMQ();
  //Publish Event
  const publishEvent=channel.publish(
    'banking-exchange',
    type,
    Buffer.from(JSON.stringify(payload))
  );
  console.log("Payment_Initiated_Publish_Event_Info",[type],publishEvent);
}
export default publishDebitResult;
