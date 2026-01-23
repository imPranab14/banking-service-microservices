import amqp from "amqplib";
import logger from "./logger.js";

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    //console.log("Transaction RabbitMQ Channel",channel);
    logger.info("RabbitMQ Connected !");
    //Check Exchange Exits OR NOT
    channel.assertExchange("banking-exchange", "topic", {
      durable: true,
    });
    //Create A Queue (transfer-debit-failed-queue)
    channel.assertQueue("transfer-debit-failed-queue", {
      durable: true,
    });

    //Create A Queue (transfer-credit-success-queue)
    channel.assertQueue("transfer-credit-success-queue", {
      durable: true,
    });
    //Create A Queue (transfer-credit-failed-queue)
    channel.assertQueue("transfer-credit-failed-queue", {
      durable: true,
    });
    //Create A Queue (transfer-compensated-queue)
    channel.assertQueue("transfer-compensated-queue", {
      durable: true,
    });
    //Bind Queue with exchange
    channel.bindQueue(
      "transfer-debit-failed-queue", //Queue Name
      "banking-exchange", //Exchange Name
      "account.debit.failed" //Routing Key Name
    );
    channel.bindQueue(
      "transfer-credit-success-queue", //Queue Name
      "banking-exchange", //Exchange Name
      "account-credit-success" //Routing Key Name
    );
    channel.bindQueue(
      "transfer-credit-failed-queue", //Queue Name
      "banking-exchange", //Exchange Name
      "account-credit-failed" //Routing Key Name
    );
    channel.bindQueue(
      "transfer-compensated-queue", //Queue Name
      "banking-exchange", //Exchange Name
      "transfer-reimbursement" //Routing Key Name
    );
    return channel;
  } catch (error) {
    console.log("Failed to connected rabbit mq", error);
  }
}
export default connectRabbitMQ;
