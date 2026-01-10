import amqp from "amqplib";
import logger from "./logger.js";

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    logger.info("RabbitMQ Connected !");
    //Check Exchange Exits OR NOT
    channel.assertExchange("banking-exchange", "topic", {
      durable: true,
    });
    //Create A Queue
    channel.assertQueue("transfer-debit-failed-queue", {
      durable: true,
    });
    //Bind Queue with exchange
    channel.bindQueue(
      "transfer-debit-failed-queue",//Queue Name
      "banking-exchange",//Exchange Name
      "account.debit.failed"//Routing Key Name
    );
    return channel;
  } catch (error) {
    console.log("Failed to connected rabbit mq", error);
  }
}
export default connectRabbitMQ;
