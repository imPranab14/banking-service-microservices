import connectRabbitMQ from "../config/rabbitmq.js";
import debitAccount from "../service/debitAccount.js";
import publishEvent from "./publish.event.js";

async function startDebitConsume() {
  //RabbitMQ channel;
  const channel = await connectRabbitMQ();
  //consume channel
  channel.consume("account-debit-queue", async (msg) => {
    //account debit data
    const event = JSON.parse(msg?.content.toString());
    console.log("Debit_Consumer_Event_Payload", event);
    try {
       await debitAccount(
        event?.eventId,
        event?.fromAccountId,
        event?.amount
      );
      //Publish Success Event
      await publishEvent("account.debit.success", event);
      channel.ack(msg)
    } catch (error) {
      console.log(error);
      //Publish Failed Event
      await publishEvent("account.debit.failed", {
        transferId: event.transferId,
        reason: error?.message,
      });
      channel.ack(msg)
    }
  });
}

export default startDebitConsume;
