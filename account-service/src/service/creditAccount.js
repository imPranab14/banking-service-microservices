import account from "../model/account.model.js";

async function creditAccount(eventId, toAccount, amount) {
  console.log("To_Account_Number",toAccount);
  //Fetch Account Details
  const fetchAccountDetails = await account.findOne({
    accountNumber: toAccount,
  });
  //If Account Number Not Found
  if (!fetchAccountDetails) {
    throw new Error("ACCOUNT_NUMBER_NOT_FOUND");
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

export default creditAccount;
