import connectRabbitMQ from "../config/rabbitmq.js";
import publishEvent from "./publish.event.js";

async function startCompensateConsumer() {
  const channel = await connectRabbitMQ();
  channel.consume("transfer-credit-failed-queue", async (msg) => {
    const event = JSON.parse(msg.content.toString());
    console.log("account debit failed response", event);

    //Publish Event
    await publishEvent('transfer-compensate',event)
    channel.ack(msg)
  });
}
export default startCompensateConsumer;
