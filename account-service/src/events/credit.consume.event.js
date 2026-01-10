import connectRabbitMQ from "../config/rabbitmq.js";
import creditAccount from "../service/creditAccount.js";
import publishEvent from "./publish.event.js";

async function startCreditConsume() {
  const channel = await connectRabbitMQ();

  channel.consume("account-credit-queue", async (msg) => {
    const event = JSON.parse(msg.content.toString());
    console.log("account debit success response", event);

    try {
      //Credit Account Function
      await creditAccount(event?.eventId, event.toAccountId, event.amount);

      //Account Credit Succuss Publish Event
      await publishEvent("account-credit-success", event);
      channel.ack(msg);
    } catch (error) {
      console.log(error);
      //Account Credit Failed Publish Event
      await publishEvent("account-credit-failed", {
        transferId: event.transferId,
        reason: error?.message,
      });
      channel.ack(msg);
    }
  });
}

export default startCreditConsume;
