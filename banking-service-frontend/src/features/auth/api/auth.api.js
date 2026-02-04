import axiosInstance from "../../../api/axios.api";

//Login Api Call
async function loginApi(payload) {
  const { email, password } = payload;
  try {
    const response = await axiosInstance.post(
      "api/v1/auth/login",
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    console.log("Login form error", error);
    throw Error
  }
}

//Logout Api Call
async function logoutApi() {
  try {
    const response = await axiosInstance.post("api/v1/auth/logout");
    console.log("Logout Button Res", response);
    return response?.data;
  } catch (error) {
    console.log("Logout Error", error);
    throw Error("Logout Error");
  }
}

export { loginApi, logoutApi };
