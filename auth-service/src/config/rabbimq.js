import amqp from "amqplib";

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    console.log("Connected to RabbitMQ!");
  } catch (error) {
    console.log("Failed to connected rabbitMQ", error);
  }
}
export default connectRabbitMQ;
