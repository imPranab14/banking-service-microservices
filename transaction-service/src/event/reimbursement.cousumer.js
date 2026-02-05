import connectMSSQL from "../config/mssql.js";
import connectRabbitMQ from "../config/rabbitmq.js";

export async function startReimbursement() {
  const channel = await connectRabbitMQ();
  channel.consume("transfer-compensated-queue", async (msg) => {
    const event = JSON.parse(msg.content.toString());
    console.log("Compensated Payload", event);
    const pool = await connectMSSQL();

    //Update in mssql
    const res = await pool.query(
      `UPDATE ${process.env.DB_NAME}.[dbo].[BankTransfers] SET Status='COMPENSATED'
      WHERE TransferId='${event.transferId}'`
    );
    console.log("MSSQL_Query_Response_COMPENSATED", res?.rowsAffected);
    channel.ack(msg)
  });
}
