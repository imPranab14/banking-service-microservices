import axiosInstance from "../../../api/axios.api";


//Account List
async function listOfAccount() {
  try {
    const response = await axiosInstance.get(
      "http://localhost:3000/api/v1/accounts/list",
      {
        withCredentials: true,
      }
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("list of account api", error);
  }
}

export { listOfAccount };
