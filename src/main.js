import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
// localstorage man
import store from "./store";
// style plugin and css framework
import "./index.css";
import "flowbite";
import "./vuetailwind.settings";

// some helpers
import VeeValidate from "vee-validate";

// date management
import VueMoment from "vue-moment";

// state management
import Vuex from "vuex";

// icon library
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faTrash,
  faUserPlus,
  faSignInAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faPaperPlane, faTrash);

// not use
//import setupInterceptors from "./services/setupInterceptors";
// layouts import
import DashboardLayout from "./layout/DashboardLayout.vue";
import EmptyLayout from "./layout/EmptyLayout.vue";

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(VueMoment);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("dashboard-layout", DashboardLayout);
Vue.component("empty-layout", EmptyLayout);
Vue.use(Vuex);

//setupInterceptors(store);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
