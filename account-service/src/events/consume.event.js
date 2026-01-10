import connectRabbitMQ from "../config/rabbitmq.js";
import dabitAccount from "../service/dabitAccount.js";
import publishDebitResult from "./publish.event.js";

async function startDabitConsume() {
  //rabitmq channel;
  const channel = await connectRabbitMQ();
  //consume channel
  channel.consume("account-debit-queue", async (msg) => {
    //account dabit data
    const event = JSON.parse(msg?.content.toString());
    console.log("Cousumer_Event_Payload", event);
    try {
      const dabitAccountInfo = await dabitAccount(
        event?.eventId,
        event?.fromAccountId,
        event?.amount
      );
      //Publish Success Event
      await publishDebitResult("account.debit.success", event);
      channel.ack(msg)
    } catch (error) {
      console.log(error);
      //Publish Success Event
      await publishDebitResult("account.debit.failed", {
        transferId: event.transferId,
        reason: error?.message,
      });
      channel.ack(msg)
    }
  });
}

export default startDabitConsume;
