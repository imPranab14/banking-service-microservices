import { create } from "zustand";
import { loginApi, logoutApi } from "../api/auth.api";
import { persist } from "zustand/middleware";

//Zustand Auth Store
function createAuthStore(set) {
  return {
    authUser: null,
    error: "",
    //NOTE Login API Call
    fetchLogin: async function (data) {
      try {
        const response = await loginApi(data);
        if (response.status === 200) {
          set({
            authUser: response.data?.data.email, //Only User Email
            error: "",
          });
        }
        //Login Success
        return true;
      } catch (error) {
        set({
          error: `${error.message}`,
        });
        //If Login failed
        return false;
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
