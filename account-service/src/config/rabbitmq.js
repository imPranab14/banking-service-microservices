import amqp from "amqplib";

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    console.log("RabbitMQ Connected !");
    return channel;
  } catch (error) {
    console.log("Failed to connected rabbit mq", error);
  }
}
export default connectRabbitMQ
