<template>
  <!-- Desktop sidebar -->

  <div class="flex flex-col w-full">
    <div class="h-full overflow-y-auto">
      <div class="mt-20 px-6 mx-auto grid">
        <notification-component
          :notification="currentNotification"
        ></notification-component>
        <breadcrumb-component :breadcrumb="[{ id: 1, name: 'Profil' }]" />
        <div class="flex flex-col justify-between">
          <div
            class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 w-full"
          >
            Profile
          </div>
          <div
            class="w-full p-6 mb-6 bg-white rounded-lg border border-gray-200 shadow-md"
          >
            <h5
              class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              General information
            </h5>
            <div class="flex flex-row w-full">
              <div class="mr-12">
                <label class="text-gray-700 text-sm" for="emailAddress"
                  >Email address</label
                >
                <input
                  class="w-full mt-2 px-2 text-sm py-3 border border-gray-200 bg-gray-50 text-gray-500 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="email"
                  placeholder="name@example.com"
                  v-validate="'required'"
                  v-model="this.currentUser.user"
                  data-vv-name="email"
                  autocomplete="off"
                  disabled
                />
              </div>
              <div class="flex-col">
                <label class="text-gray-700 text-sm" for="role">Role</label>
                <div
                  v-if="currentUser.role == 'Admin'"
                  class="mt-2 px-3 py-2 mx-auto font-semibold leading-tight text-green-700 bg-green-100 rounded-lg dark:bg-green-700 dark:text-green-100"
                  autocomplete="off"
                >
                  {{ this.currentUser.role }}
                </div>
                <div
                  v-if="currentUser.role == 'Printer'"
                  class="mt-2 px-3 py-2 mx-auto font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-700 dark:text-yellow-100"
                  autocomplete="off"
                >
                  {{ this.currentUser.role }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full p-6 bg-white rounded-lg border border-gray-200 shadow-md"
          >
            <h5
              class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Password information
            </h5>
            <form name="form" @submit.prevent="handleResetPassword">
              <div class="flex flex-row w-full">
                <div class="mr-6">
                  <label class="text-gray-700 text-sm" for="currentPassword"
                    >Current Password</label
                  >
                  <input
                    class="w-full mt-2 px-2 text-sm py-3 border border-gray-200 bg-gray-50 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="password"
                    placeholder="XXXXXX"
                    v-validate="'required'"
                    v-model="currentPassword"
                    data-vv-name="currentPassword"
                    name="currentPassword"
                    autocomplete="off"
                  />
                  <div
                    v-if="errors.has('currentPassword')"
                    class="text-red-500"
                    role="alert"
                  >
                    Current password is required!
                  </div>
                </div>
                <div class="ml-6">
                  <label class="text-gray-700 text-sm" for="newPassword"
                    >New Password</label
                  >
                  <input
                    class="w-full mt-2 px-2 text-sm py-3 border border-gray-200 bg-gray-50 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="password"
                    placeholder="XXXXXX"
                    v-validate="'required'"
                    v-model="newPassword"
                    data-vv-name="newPassword"
                    name="newPassword"
                    autocomplete="off"
                  />
                  <div
                    v-if="errors.has('newPassword')"
                    class="text-red-500"
                    role="alert"
                  >
                    New password is required!
                  </div>
                </div>
              </div>
              <div class="my-4">
                <p class="font-bold text-xs">Password requirements:</p>
                <p class="text-gray-500 text-xs">
                  at least 8 characters (and up to 30 characters)
                </p>
              </div>
              <div class="w-full my-2 justify-end text-right">
                <div class="flex-grow">
                  <div v-if="message" class="bg-red-200 mt-4 p-6" role="alert">
                    {{ message }}
                  </div>
                </div>
                <button
                  type="submit"
                  class="px-6 py-2 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadcrumbComponent from "../components/Breadcrumb.vue";
import NotificationComponent from "../components/Notifications.vue";

export default {
  name: "profile-view",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      message: "",
      currentNotification: {},
    };
  },
  components: {
    BreadcrumbComponent,
    NotificationComponent,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    console.log();
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleResetPassword() {
      console.log("handleResetPassword:: ");
      this.$validator
        .validateAll()
        .then((isValid) => {
          if (!isValid) {
            return;
          }

          if (this.currentPassword && this.newPassword) {
            this.$store
              .dispatch("auth/reset_password", {
                email: this.currentUser.user,
                oldPassword: this.currentPassword,
                newPassword: this.newPassword,
                token: this.currentUser.accessToken,
              })
              .then((response) => {
                console.log("handleResetPassword:: ", response);

                if (response == undefined) {
                  this.currentNotification = {
                    message: "An error occurs: your current password is wrong",
                    type: "danger",
                  };
                  return;
                }
                if (response.errors && response.errors.length > 0) {
                  this.currentNotification = {
                    message:
                      "An error occurs: " + JSON.stringify(response.errors),
                    type: "danger",
                  };
                }
                if (response.success && response.success == true) {
                  this.currentNotification = {
                    message: "The password has been successfully changed",
                    type: "success",
                  };
                }
              })
              .catch((e) => console.log(e));
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
