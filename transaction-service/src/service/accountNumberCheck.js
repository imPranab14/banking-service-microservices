import axios from "axios";

async function getaAccountDetails(accountNumber, token) {
  try {
    const response = await axios.get(
      `${process.env.ACCOUNT_SERVICE_URL}validation/?accountNumber=${accountNumber}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.log("Faild to fetch valid account api", error);
  }
}
export default getaAccountDetails;
