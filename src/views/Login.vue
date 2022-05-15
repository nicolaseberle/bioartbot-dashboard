<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <img class="w-12 mr-6" src="/logo.png" />
        <span class="text-2xl font-semibold text-gray-700">BioArtBot</span>
        <p>{{ URL_API }}</p>
        <p>{{ URL_FRONTEND }}</p>
      </div>
      <form class="mt-4" name="form" @submit.prevent="handleLogin">
        <label for="username" class="block">
          <span class="text-sm text-gray-700">Email</span>
          <input
            class="block w-full mt-1 p-2 px-4 border-2 border-gray-100 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            v-model="user.username"
            placeholder="nom@example.com"
            v-validate="'required'"
            type="text"
            name="username"
          />
          <div v-if="errors.has('username')" class="text-red-500" role="alert">
            Email is required!
          </div>
        </label>

        <label class="block mt-3 w-full">
          <label class="text-sm text-gray-700" for="password">Password</label>
          <input
            type="password"
            class="block w-full mt-1 p-2 px-4 border-2 border-gray-100 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            name="password"
            placeholder="password"
            v-model="user.password"
            v-validate="'required'"
          />
          <div v-if="errors.has('password')" class="text-red-500" role="alert">
            Password is required!
          </div>
        </label>
        <div class="flex w-full">
          <router-link
            to="/reset_password"
            class="flex underline text-indigo-500 ml-auto text-xs pt-2 cursor-pointer"
          >
            Forgot your password ?
          </router-link>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
          >
            Login
          </button>
          <div class="">
            <div v-if="message" class="bg-red-200 mt-4 p-6" role="alert">
              {{ message }}
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", "", "", "", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    URL_API() {
      return process.env.VUE_APP_BACKEND_API_URL;
    },
    URL_FRONTEND() {
      return process.env.VUE_APP_FRONTEND_URL;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard").catch((err) => {
        console.log(err);
      });
    }
  },

  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/dashboard").catch((err) => {
                console.log(err);
              });
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
</style>
