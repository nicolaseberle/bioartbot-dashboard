import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import ForgotPassword from "./views/ForgotPassword.vue";
import ResetPassword from "./views/ResetPassword.vue";
import Dashboard from "./views/Dashboard.vue";
import DashboardArtists from "./views/DashboardArtist.vue";
import Profile from "./views/Profile.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      meta: { layout: "dashboard-layout" },
      component: Dashboard,
    },
    {
      path: "/dashboard_artist",
      name: "DashboardArtist",
      meta: { layout: "dashboard-layout" },
      component: DashboardArtists,
    },
    {
      path: "/",
      meta: { layout: "dashboard-layout" },
      component: Dashboard,
    },
    {
      path: "/login",
      name: "Login",
      meta: { layout: "empty-layout" },
      component: Login,
    },

    {
      path: "/forgot_password",
      name: "ForgotPassword",
      meta: { layout: "empty-layout" },
      component: ForgotPassword,
    },
    {
      path: "/reset_password",
      name: "ResetPassword",
      meta: { layout: "empty-layout" },
      component: ResetPassword,
    },
    {
      path: "/logout",
      name: "Logout",
      meta: { layout: "empty-layout" },
    },
    {
      path: "/profile",
      name: "Profile",
      meta: { layout: "dashboard-layout" },
      component: Profile,
    },
  ],
});
/*
router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
*/
