import connectMSSQL from "../config/mssql.js";
import connectRabbitMQ from "../config/rabbitmq.js";

export async function startCreditSuccess() {
  const channel = await connectRabbitMQ();
  channel.consume("transfer-credit-success-queue", async (msg) => {
    const event = JSON.parse(msg.content.toString());
    console.log("Transfer_Credit_Success_Queue_Payload", event);
    const pool = await connectMSSQL();
    //Update in mssql
    const res = await pool.query(
      `UPDATE ${process.env.DB_NAME}.[dbo].[BankTransfers] SET Status='COMPLETED'
      WHERE TransferId='${event.transferId}'`
    );
    console.log("MSSQL_Query_Response", res?.rowsAffected);
    channel.ack(msg);
  });
}
