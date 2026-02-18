import axios from "axios";
import { useAuthStore } from "../features/auth/store/useAuthStore";
import { Navigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});


axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log("axios_interceptor_error", error);
    if(error.response.status === 403 ||  error.response.status ===401){
      //NOTE getState() provides access to the current, live state of a store without triggering a re-render in React components
        const logout = useAuthStore.getState().fetchLogout;
        logout();
        window.location.href = "/";
    }

    //Write Redirect also
    //alert("Alert Form Axios Interceptors") 
    return Promise.reject(error)
  }
);
export default axiosInstance;
