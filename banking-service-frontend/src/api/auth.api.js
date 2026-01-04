import axios from "axios";
import axiosInstance from "./axios.api";

async function loginUser(payload) {
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
      }
    );
    return apiResponse;
  } catch (error) {
    console.log("Login form error", error);
  }
}

export { loginUser };
