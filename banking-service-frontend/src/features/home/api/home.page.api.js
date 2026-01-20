import axiosInstance from "../../../api/axios.api";

//Account List
async function listOfAccount() {
  try {
    const response = await axiosInstance.get("api/v1/accounts/list");
    console.log("response", response);
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
    throw error
  }
}
export { listOfAccount, deleteAccount, createAccount };
