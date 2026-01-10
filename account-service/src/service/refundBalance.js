import account from "../model/account.model.js";

async function refundAccount(fromAccount, amount) {
    console.log("Refund_account",fromAccount,amount);
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

  //Debit Amount
  fetchAccountDetails.balance += amount;
  await fetchAccountDetails?.save();

  return { success: true };
}

export default refundAccount;
