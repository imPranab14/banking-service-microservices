import amqp from "amqplib";

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    //Check exchange exists
    await channel.assertExchange("banking-exchange", "topic", {
      durable: true,
    });

    //create debit a queue
    await channel.assertQueue("account-debit-queue", {
      durable: true,
    });

    //create credit a queue
     await channel.assertQueue("account-credit-queue", {
      durable: true,
    });


    //exchange bind with queue
    await channel.bindQueue(
      "account-debit-queue", //queue name
      "banking-exchange", //exchange name
      "transfer.initiated" //routing key name
    );

     //exchange bind with queue
    await channel.bindQueue(
      "account-credit-queue", //queue name
      "banking-exchange", //exchange name
      "account.debit.success" //routing key name
    );
    console.log("Account Service RabbitMQ Connected !");
    return channel;
  } catch (error) {
    console.log("Failed to connected rabbit mq", error);
  }
}
export default connectRabbitMQ;
