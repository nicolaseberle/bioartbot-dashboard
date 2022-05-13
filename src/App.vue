<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EventBus from "./common/EventBus";

export default {
  name: "app",
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    //not use
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("admin");
      }

      return false;
    },
    //not use
    showPrinterBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("printer");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    },
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeDestroy() {
    EventBus.remove("logout");
  },
};
</script>
