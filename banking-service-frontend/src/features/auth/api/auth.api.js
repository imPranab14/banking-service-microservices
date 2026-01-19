import axiosInstance from "../../../api/axios.api";

async function loginApi(payload) {
  const { email, password } = payload;
  try {
    const apiResponse = await axiosInstance.post(
      "api/v1/auth/login",
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
    return apiResponse;
  } catch (error) {
    console.log("Login form error", error);
  }
}
async function logoutApi() {
  try {
    const response = await axiosInstance.post("api/v1/auth/logout");
    console.log("Logout Button Res",response);
    return response?.data;
  } catch (error) {
    console.log("Logout Error", error);
    throw Error("Logout Error");
  }
}

export { loginApi, logoutApi };
