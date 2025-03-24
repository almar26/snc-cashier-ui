export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useMyAuthStore());
  const { userInfo } = storeToRefs(useMyAuthStore());
  const token = useCookie("token");
  const user_info = JSON.parse(localStorage.getItem("user-info"));

  if (token.value === null && user_info) {
    localStorage.removeItem("user-info");
    console.log("Token doesnt exist but it has data");
  }
  if (token.value && user_info === null) {
    console.log("Token exist but no user info details");
    localStorage.removeItem("user-info");
    token.value = null;
    authenticated.value = false;
  }

  if (token.value) {
    authenticated.value = true;
    userInfo.value = user_info;
  }

  if (token.value && user_info.user.user_role === "head-cashier") {
    if (to.meta.layout === "auth") {
      return navigateTo("/");
    }
  } else if (token.value && user_info.user.user_role === "cashier") {
    if (to.meta.layout === "auth") {
      return navigateTo("/");
    }

    if (user_info.user.user_role === "cashier" && to.path.startsWith("/courses")) {
        return navigateTo("/");
    }
    if (user_info.user.user_role === "cashier" && to.path.startsWith("/reports")) {
        return navigateTo("/");
    }
  }

  if (!token.value && to.meta.layout !== "auth") {
    abortNavigation();
    return navigateTo("/auth/signin");
  }
});
