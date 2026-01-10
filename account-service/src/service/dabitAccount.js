import account from "../model/account.model.js";

async function dabitAccount(eventId, fromAccount, amount) {
  //Fatch Account Details
  const fatchAccountDeails = await account.findOne({
    accountNumber: fromAccount,
  });
  //If Account Number Not Founde
  if (!fatchAccountDeails) {
    throw new Error("ACCOUNT_NUMBER_FOUNDE");
  }
  //Check Account Active OR Not
  if (fatchAccountDeails?.accountStatus != "active") {
    throw new Error("ACCOUNT_NOTACTIVE");
  }
  //Not Enough Balance
  if (fatchAccountDeails.balance < amount) {
    throw new Error("INSUFFICIENT_FUNDS");
  }
  //Dabit Amount
  fatchAccountDeails.balance -= amount;
  await fatchAccountDeails?.save();

  return { success: true };
}

export default dabitAccount;
