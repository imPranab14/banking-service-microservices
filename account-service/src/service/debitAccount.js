import account from "../model/account.model.js";

async function debitAccount(eventId, fromAccount, amount) {
  //Fetch Account Details
  const fetchAccountDetails = await account.findOne({
    accountNumber: fromAccount,
  });
  //If Account Number Not Found
  if (!fetchAccountDetails) {
    throw new Error("ACCOUNT_NUMBER_FOUND");
  }
  //Check Account Active OR Not
  if (fetchAccountDetails?.accountStatus != "active") {
    throw new Error("ACCOUNT_NOT_ACTIVE");
  }
  //Not Enough Balance
  if (fetchAccountDetails.balance < amount) {
    throw new Error("INSUFFICIENT_FUNDS");
  }
  //Debit Amount
  fetchAccountDetails.balance -= amount;
  await fetchAccountDetails?.save();

  return { success: true };
}

export default debitAccount;
