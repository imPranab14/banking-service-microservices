import connectRabbitMQ from "../config/rabbitmq.js";
import TransferSchema from "../schema/transfer.schema.js";
import getaAccountDetails from "../service/accountNumberCheck.js";
import insertBankTransfer from "../service/insertBankTransfer.js";
import { ApiError } from "../utils/ApiError.js";
import { v4 as uuidv4 } from "uuid";

async function handelTransfer(req, res) {
  const transferPayload = TransferSchema.safeParse(req.body);
  try {
    //Zod Validation
    if (!transferPayload.success) {
      return res
        .status(400)
        .send(
          new ApiError(
            400,
            "input field missing",
            transferPayload.error._zod.def
          )
        );
    }
    const {
      fromAccountNo: userAccountNo,
      toAccountNo: destinationAccountNo,
      amount,
    } = transferPayload?.data;
    //Check amount greater then zero
    if (amount <= 0) {
      return res
        .status(400)
        .send(new ApiError(400, "Amount should be greater than zero"));
    }
    //Check form account number != to account number
    if (userAccountNo === destinationAccountNo) {
      return res
        .status(400)
        .send(
          new ApiError(
            400,
            "From account number and to account number are the same"
          )
        );
    }
    //Check source account number valid or not
    const checkFromAccountNumber = await getaAccountDetails(
      userAccountNo,
      req.headers.authorization
    );
    //if account number not found
    if (!checkFromAccountNumber) {
      return res.status(404).send({ message: "user account number not found" });
    }
    //source account user verify
    if (
      req?.headers["x-user-email"].toLowerCase() !=
      checkFromAccountNumber?.email
    ) {
      return res.status(460).send({
        message: "Logged-in user does not match the source account holder.",
        soureEmail: req?.headers["x-user-email"],
        destinationEmail: checkFromAccountNumber?.email,
      });
    }

    //check destination account number valid or not
    const checkToAccountNumber = await getaAccountDetails(
      destinationAccountNo,
      req.headers.authorization
    );
    //destination account number check
    if (!checkToAccountNumber) {
      return res
        .status(404)
        .send({ message: "destination account number not found" });
    }
    //Payload for rabbit mq
    const Payload = {
      transferId: uuidv4(),
      fromAccountId: userAccountNo,
      toAccountId: destinationAccountNo,
      amount: amount,
      status: "PENDING",
    };

    console.log("Payload", Payload);
    //Save in mssql db
    await insertBankTransfer(Payload);
    //Publice Rabbit MQ
    const channel = await connectRabbitMQ();
    await channel.assertExchange("banking-exchange", "topic", {
      durable: true,
    });
    const queueResponse = channel.publish(
      "banking-exchange",
      "transfer.initiated", //routing key
      Buffer.from(JSON.stringify(Payload)),
      {
        persistent: true, // survives broker restart
        contentType: "application/json",
      }
    );

    //Api Response
    res.status(200).send({
      success: true,
      rabbitMQ_Response:queueResponse,
      transferId:Payload?.transferId,
      status: "PENDING",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal transfer processing failed",
    });
  }
}
export { handelTransfer };
