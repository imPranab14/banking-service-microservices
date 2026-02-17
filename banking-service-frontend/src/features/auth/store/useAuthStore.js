import { create } from "zustand";
import { loginApi, logoutApi } from "../api/auth.api";
import { persist } from "zustand/middleware";

//Zustand Auth Store
function createAuthStore(set) {
  return {
    authUser: null,
    error: "",
    //Login API Call
    fetchLogin: async function (data) {
      try {
        const response = await loginApi(data);
        console.log("Login Api Response", response);
        if (response.status === 200) {
          set({
            authUser: response.data,
          });
        }
      } catch (error) {
        set({
          error:`${error.message}`,
        });
      }
    },
    //Logout API Call
    fetchLogout: async () => {
      try {
        const response = await logoutApi();
        if (response.status === 200) {
          set({
            authUser: null,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
}

//Crate Store
const useAuthStore = create(persist(createAuthStore));
export { useAuthStore };
