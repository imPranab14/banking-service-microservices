import connectRabbitMQ from "../config/rabbitmq.js";
import TransferSchema from "../schema/transfer.schema.js";
import getaAccountDetails from "../service/accountNumberCheck.js";
import { ApiError } from "../utils/ApiError.js";

async function handelTransfer(req, res) {
  const transferPayload = TransferSchema.safeParse(req.body);
  //Zod Validation
  if (!transferPayload.success) {
    return res
      .status(400)
      .send(
        new ApiError(400, "input field missing", transferPayload.error._zod.def)
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
  if (req?.headers["x-user-email"] != checkFromAccountNumber?.email) {
    res.status(460).send({
      message: "Logged-in user does not match the source account holder.",
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
    eventId: "uuid",
    transferId: "uuid",
    fromAccountId: "A1001",
    toAccountId: "B2002",
    amount: 500,
  };

  const channel = await connectRabbitMQ();
  await channel.assertExchange("banking-exchange", "topic", {
    durable: true,
  });
  const queueResponse = channel.publish(
    "banking-exchange",
    "transfer.initiated",//routing key
    Buffer.from(JSON.stringify(Payload)),
    {
      persistent: true, // survives broker restart
      contentType: "application/json",
    }
  );
  console.log("queueResponse", queueResponse);

  //Save DB

  res.status(200).send("ok");
}
export { handelTransfer };
