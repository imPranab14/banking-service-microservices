import connectMSSQL from "../config/mssql.js";
import connectRabbitMQ from "../config/rabbitmq.js";

async function startFailedConsumer() {
  const channel = await connectRabbitMQ();
  channel.consume("transfer-debit-failed-queue", async (msg) => {
    const event = JSON.parse(msg.content.toString());
    console.log("Failed Transaction Payload", event);
    const pool = await connectMSSQL();
 
    //Update in mssql 
    const res = await pool.query(
      `UPDATE ${process.env.DB_NAME}.[dbo].[BankTransfers] SET Status='FAILED', failure_reason='${event.reason}'
      WHERE TransferId='${event.transferId}'`
    );
    console.log("MSSQL_Query_Response", res?.rowsAffected);
    channel.ack(msg)
  });
}
export default startFailedConsumer;
