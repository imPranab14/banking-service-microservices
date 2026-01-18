import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log("axios error", error);
    //Write Redirect also
    //alert("Alert Form Axios Interceptors") 
    return Promise.reject(error)
  }
);
export default axiosInstance;
