import sql from "mssql";
import { v4 as uuidv4 } from "uuid";
import connectMSSQL from "../config/mssql.js";

async function insertBankTransfer({
  transferId,
  fromAccountId,
  toAccountId,
  amount,
  status,
}) {
  const pool = await connectMSSQL();

  await pool
    .request()
    .input("TransferId", sql.UniqueIdentifier, transferId)
    .input("FromAccountId", sql.BigInt, fromAccountId)
    .input("ToAccountId", sql.BigInt, toAccountId)
    .input("Amount", sql.Decimal(18, 2), amount)
    .input("Status", sql.VarChar(20), status)
    .query(`
      INSERT INTO BankTransfers (
        TransferId,
        FromAccountId,
        ToAccountId,
        Amount,
        Status
      )
      VALUES (
        @TransferId,
        @FromAccountId,
        @ToAccountId,
        @Amount,
        @Status
      )
    `);
}
export default insertBankTransfer