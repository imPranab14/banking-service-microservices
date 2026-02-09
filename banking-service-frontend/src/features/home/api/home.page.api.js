import axiosInstance from "../../../api/axios.api";

//Account List
async function listOfAccount() {
  try {
    const response = await axiosInstance.get("api/v1/accounts/list");
    return response.data;
  } catch (error) {
    console.log("list of account api", error);
    throw error;
  }
}

//Delete Account
async function deleteAccount(deleteAccountNumber) {
  try {
    const response = await axiosInstance.delete(
      `api/v1/accounts/deleteAccount/?accountNumber=${deleteAccountNumber}`,
    );
    return response;
  } catch (error) {
    throw error("Delete Account Api Error");
  }
}

//Create Account
async function createAccount(accountType) {
  try {
    const response = await axiosInstance.post(`api/v1/accounts/account`, {
      accountType,
    });
    return response;
  } catch (error) {
    console.log("Create account error", error);
    throw error;
  }
}

//LIst of account transaction
async function listOfTransaction(accountNumber) {
  try {
    const response = await axiosInstance.get(
      `api/v1/transaction/list-transaction?accountNumber=${accountNumber}`,
    );
    return response;
  } catch (error) {
    console.log("Create account error", error);
    throw error;
  }
}

//Money Transfer
async function moneyTransfer(data) {
  try {
    const response = await axiosInstance.post(
      `api/v1/transaction/transfer`,
      data,
    );
    //Custom Delay
    // return new Promise(function (resolve) {
    //   setTimeout(() => {
    //     resolve(response);
    //   }, 5 * 1000);
    // });

   return response;
  } catch (error) {
    console.log("Money transfer api error", error);
    throw error;
  }
}

//Valid account number
async function isValidAccountNumber(accountNumber) {
  try {
    const response = await axiosInstance.get(
      `api/v1/accounts/validation/?accountNumber=${accountNumber}`,
    );
    return response;
  } catch (error) {
    console.log("Valid account number api error", error);
    throw error ;
  }
}

export {
  listOfAccount,
  deleteAccount,
  createAccount,
  listOfTransaction,
  moneyTransfer,
  isValidAccountNumber
};
