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
          <p class="text-xl font-bold">Add New Location</p>
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
          <form @submit.prevent="addNewLocation">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700 text-sm" for="name"
                  >Name</label
                >
                <input
                  class="w-full mt-2 px-2 text-sm py-3 border border-gray-200 bg-gray-50 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                  placeholder="Community Lab"
                  v-validate="'required'"
                  data-vv-name="name"
                  v-model="location.name"
                  autocomplete="off"
                />
              </div>
              <div>
                <label class="text-gray-700 text-sm" for="description"
                  >Description</label
                >
                <textarea
                  class="w-full mt-2 px-2 text-sm py-3 border border-gray-200 bg-gray-50 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  placeholder="In Oakland, Contact Tim"
                  v-validate="'required'"
                  data-vv-name="description"
                  v-model="location.description"
                  autocomplete="off"
                />
                <div
                  v-if="errors.has('description')"
                  class="text-red-500"
                  role="alert"
                >
                  Description is required
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
                Create location
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Location from "../models/location";
import LocationService from "../services/location.service";

export default {
  props: ["open"],
  data() {
    return {
      location: new Location("", ""),
      message: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    closeModal(notification) {
      this.$emit("closeModal", notification);
    },
    addNewLocation() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return;
        }

        if (this.location.name && this.location.description) {
          LocationService.createLocation(
            this.location.name,
            this.location.description,
            this.currentUser.accessToken
          )
            .then(
              () => {
                this.location.resetLocation();
                this.closeModal({
                  message: "Successfully created location",
                  type: "success",
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
                this.closeModal({
                  message: "Failed to create location",
                  type: "danger",
                });
              }
            )
            .catch((err) => {
              console.log("error :: ", err.response);
              this.closeModal({
                message: "Failed to create location",
                type: "danger",
              });
            });
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
