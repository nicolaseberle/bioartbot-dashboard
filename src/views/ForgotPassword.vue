<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <svg
          class="w-8 h-8 ml-2 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          ></path>
        </svg>
        <span class="text-2xl font-semibold text-gray-700">BioArtBot</span>
      </div>

      <form class="mt-4" name="form" @submit.prevent="handleResetPassword">
        <label class="block mt-3">
          <label class="text-sm text-gray-700" for="password"
            >New Password</label
          >
          <input
            type="password"
            class="block w-full mt-1 p-2 px-4 border-2 border-gray-100 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            name="password"
            placeholder="password"
            v-model="password1"
            v-validate="'required'"
          />
          <div
            v-if="errors.has('password')"
            class="text-xs text-red-500"
            role="alert"
          >
            Password is required!
          </div>
        </label>
        <label class="block mt-3">
          <label class="text-sm text-gray-700" for="password"
            >Confirmation Password</label
          >
          <input
            type="password"
            class="block w-full mt-1 p-2 px-4 border-2 border-gray-100 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            name="password"
            placeholder="password"
            v-model="password2"
            v-validate="'required'"
          />
          <div
            v-if="errors.has('password')"
            class="text-xs text-red-500"
            role="alert"
          >
            Password is required!
          </div>
        </label>
        <div class="mt-6">
          <div
            v-if="message"
            class="text-xs text-red-500 bg-red-200 p-6"
            role="alert"
          >
            {{ message }}
          </div>
        </div>
        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
          >
            Reset Password
          </button>
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
      password1: "",
      password2: "",
      oldPassWord: "",
      email: "",
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    /*if (this.loggedIn) {
      this.$router.push("/dashboard").catch((err) => {
        console.log(err);
      });
    }*/
  },
  mounted() {
    if (this.$route.query.token && this.$route.query.email) {
      this.oldPassWord = this.$route.query.token;
      this.email = this.$route.query.email;
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    handleResetPassword() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.password1 && this.password2) {
          if (this.password1 == this.password2) {
            let newPassword = this.password1;
            this.$store
              .dispatch(
                "auth/reset_password",
                this.email,
                this.oldPassWord,
                newPassword
              )
              .then(
                () => {
                  this.$router.push("/login").catch((err) => {
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
          } else {
            this.message = "Both password don't match";
          }
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
