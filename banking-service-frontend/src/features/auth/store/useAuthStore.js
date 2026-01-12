import { create } from "zustand";
import { loginApi } from "../api/auth.api";

function createAuthStore(set) {
  return {
    // Initial state
    authUser: false,
    error:'',
    //Login Api Call
    fetchLogin: async function (data) {
      const response = await loginApi(data);
      console.log("Login Api Response",response);
      if (response.status === 200) {
        set({
          authUser: true,
        });
      }
    //   set({
    //     error:
    //   })
    },
  };
}

//Crate Store
const useAuthStore = create(createAuthStore);
export { useAuthStore };
