<template>
  <!--<Breadcrumb breadcrumb="Modal" />-->
  <div
    :class="`modal ${
      !open && 'opacity-0 pointer-events-none'
    } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
  >
    <div
      @click="closeModal()"
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
    ></div>

    <div class="z-50 w-1/2 mx-auto overflow-y-auto bg-white rounded">
      <div
        class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
      >
        <svg
          class="text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          />
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="py-4 text-left">
        <!--Title-->
        <div class="px-6 flex items-center justify-between pb-6 border-b">
          <p class="text-xl font-bold">Edit user</p>
          <div class="z-50 cursor-pointer modal-close" @click="closeModal()">
            <svg
              class="text-black fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              />
            </svg>
          </div>
        </div>

        <!--Body-->

        <div class="px-6 bg-white rounded-md">
          <form @submit.prevent="updateUser">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700 text-sm" for="emailAddress"
                  >Email</label
                >
                <input
                  class="w-full mt-2 px-2 text-sm py-3 border border-gray-200 bg-gray-50 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="email"
                  placeholder="name@example.com"
                  v-validate="'required'"
                  v-model="user.email"
                  disabled
                />
              </div>
              <div>
                <label class="text-gray-700 text-sm" for="password"
                  >New Password</label
                >
                <input
                  class="w-full mt-2 px-2 text-sm py-3 border border-gray-200 bg-gray-50 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="password"
                  placeholder="password (8 characters min.)"
                  v-model="newPassword"
                />
              </div>
              <div>
                <label class="text-gray-700 text-sm" for="role">Role</label>
                <div class="flex flex-row mt-4 w-full justify-between">
                  <div class="flex items-center mr-8">
                    <input
                      checked
                      id="role-radio-1"
                      type="radio"
                      value="Printer"
                      v-model="user.role"
                      name="role-radio"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="role-radio-1"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Printer</label
                    >
                  </div>
                  <div class="flex items-center">
                    <input
                      id="role-radio-2"
                      type="radio"
                      value="Admin"
                      v-model="user.role"
                      name="role-radio"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="role-radio-2"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Administrator</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <!--Footer-->
            <div class="">
              <div v-if="message" class="bg-red-200 mt-4 p-6" role="alert">
                {{ message }}
              </div>
            </div>
            <div class="flex justify-between pt-12">
              <button
                @click.prevent="closeModal()"
                class="p-3 px-6 py-3 mr-2 text-indigo-800 border bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminService from "../services/admin.service";

export default {
  props: ["open", "selectedUser"],
  data() {
    return {
      user: this.selectedUser,
      newPassword: "",
      message: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", true);
    },
    changeRole(email, role) {
      if (email !== this.currentUser.user) {
        AdminService.updateRole(email, role, this.currentUser.accessToken)
          .then(
            () => {
              this.closeModal();
            },
            (error) => {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          )
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
    updateUser() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return;
        }
        if (this.user.role) {
          this.changeRole(this.user.email, this.user.role);
        }
        if (this.newPassword !== "") {
          if (this.newPassword.length > 3) {
            this.$store
              .dispatch("auth/reset_password", {
                email: this.currentUser.user,
                oldPassword: "",
                newPassword: this.newPassword,
                token: this.currentUser.accessToken,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((e) => console.log(e));
          }
        }
      });
    },
  },
};
</script>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
