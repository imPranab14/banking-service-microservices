import connectRabbitMQ from "../config/rabbitmq.js";

async function publishEvent(type, payload) {
  const channel = await connectRabbitMQ();
  //Publish Event
  const publishInfo=channel.publish(
    'banking-exchange',
    type,
    Buffer.from(JSON.stringify(payload))
  );
  console.log("Publish_Event_Info",[type],publishInfo,payload);
}
export default publishEvent;
