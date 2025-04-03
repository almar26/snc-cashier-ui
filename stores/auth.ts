import { defineStore } from 'pinia'

interface UserPayloadInterface {
  identifier: string;
  password: string;
}

export const useMyAuthStore = defineStore("myAuthStore", {
  state: () => ({
    authenticated: false,
    loading: false,
    userInfo: {},
    errorLogin: false,
    errorMessage: "",
   }),
  actions: {
    // Login Function
    async authenticateUser({ identifier, password }: UserPayloadInterface) {
      const baseUrl = useRuntimeConfig().public.baseURL;
      const { data, pending, error }: any = await useFetch(`${baseUrl}/api/auth/local`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          identifier,
          password,
        }
      });
      //this.loading = pending
      if (data.value) {
        let userRole = data?.value.user.user_role;
        if (userRole !== 'administrator' && userRole !== 'head-cashier' && userRole !== 'cashier') {
       
          this.errorLogin = true;
          return error;
        }
        localStorage.setItem("user-info", JSON.stringify(data.value));
        const token = useCookie('token');
        token.value = data?.value?.jwt;
        this.authenticated = true;
        this.errorLogin = false;
      } else {
        this.errorLogin = true;
        this.errorMessage = error.value.data.error.message;
      }
    },

    // Logout Function
    logUserOut() {
      const token = useCookie('token');
      token.value = null;
      this.authenticated = false;
      this.userInfo = {};
      localStorage.removeItem("user-info");
    }
  }
})
