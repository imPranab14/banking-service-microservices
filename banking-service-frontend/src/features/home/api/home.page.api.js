import axiosInstance from "../../../api/axios.api";

//Account List
async function listOfAccount() {
  try {
    const response = await axiosInstance.get("api/v1/accounts/list");
    //console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("list of account api", error);
    throw error
  }
}

export { listOfAccount };
