import { create } from "zustand";
import { loginApi } from "../api/auth.api";
import { persist } from "zustand/middleware";

//Zustand Auth Store
function createAuthStore(set) {
  return {
    authUser: null,
    //error: "",
    //Login Api Call
    fetchLogin: async function (data) {
      const response = await loginApi(data);
      console.log("Login Api Response", response);
      if (response.status === 200) {
        set({
          authUser: response.data,
        });
      }
    },
  };
}

//Crate Store
const useAuthStore = create(persist(createAuthStore));
export { useAuthStore };
