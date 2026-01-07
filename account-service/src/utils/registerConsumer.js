import connectRabbitMQ from "../config/rabbitmq.js";

async function registerConsumer() {
  const channel = await connectRabbitMQ();
  const consumerSection = await channel.consume(
    "register_queue",
    (msg) => {
      console.log(msg.content.toString());
    },
    {
      noAck: true,
    }
  );
}

export default registerConsumer;
