import axios from "axios";

async function getAccountDetails(accountNumber, token) {
  try {
    const response = await axios.get(
      `${process.env.ACCOUNT_SERVICE_URL}validation/?accountNumber=${accountNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch valid account api", error);
  }
}
export default getAccountDetails;
