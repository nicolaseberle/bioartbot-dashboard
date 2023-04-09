<template>
  <div class="flex flex-col w-full">
    <main class="h-full overflow-y-auto">
      <div class="mt-20 px-6 mx-auto grid">
        <!-- Notification -->
        <notification-component
          :notification="currentNotification"
        ></notification-component>
        <!-- Breadcrumb -->
        <breadcrumb-component
          :breadcrumb="[
            { id: 1, name: 'Locations' },
          ]"
        />
        <div class="flex flex-row justify-between">
          <div
            class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Locations -
            <span class="text-lg"
              >for Labware and Strains<span class="text-gray-500 ml-2 font-light"
                >({{ total }})</span
              ></span
            >
          </div>
          <!-- Button during multi-selection -->
          <div
            v-if="multiSelectLocation.length > 0 && currentUser.role == 'Admin'"
            class="ml-auto flex flex-row mr-2 my-auto"
          >
            <t-dropdown>
              <div
                slot="trigger"
                slot-scope="{
                  mousedownHandler,
                  focusHandler,
                  blurHandler,
                  keydownHandler,
                }"
                class="ml-auto flex flex-row my-auto"
              >
                <button
                  class="flex my-auto items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-black transition-colors duration-150 bg-gray-200 border border-transparent rounded-lg active:bg-gray-400 hover:bg-gray-400 focus:outline-none"
                  @mousedown="mousedownHandler"
                  @focus="focusHandler"
                  @blur="blurHandler"
                  @keydown="keydownHandler"
                >
                  Actions
                </button>
              </div>

              <div slot-scope="{ hide }" class="flex flex-col text-left">
                <button
                  class="border-t border-gray-200 px-4 py-3 w-full text-left text-sm leading-5 text-red-500 transition duration-150 ease-in-out hover:bg-red-100 focus:outline-none focus:bg-red-100"
                  role="menuitem"
                  @click="
                    removeAllSelectedLocations();
                    hide();
                  "
                >
                  Delete selected
                </button>
              </div>
            </t-dropdown>
          </div>
          <!-- Button add user -->
          <div class="my-auto">
            <button
              v-if="currentUser.role == 'Admin'"
              class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-500 focus:outline-none focus:shadow-outline-purple"
              @click="openCreationLocationModal = true"
            >
              <span class="mr-2 font-bold" aria-hidden="true">+</span>
              Add location
            </button>
          </div>
        </div>
        <!-- New Table -->
        <div class="w-full overflow-hidden rounded-lg">
          <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap mb-20">
              <!-- Header of the Table -->
              <thead>
                <tr
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                >
                  <th class="pl-2 py-3"></th>
                  <th class="pl-24 py-3">Name</th>
                  <th class="px-4 py-3 w-1/3">Description</th>
                  <th class="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <!-- Body of the Table -->
              <tbody
                class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              >
                <tr
                  v-for="location in orderedLocations"
                  :key="location.name"
                  class="text-gray-700 dark:text-gray-400"
                >
                  <td class="px-4 py-3 my-auto text-sm">
                    <div class="flex items-center">
                      <input
                        v-if="currentUser.role == 'Admin'"
                        id="default-checkbox"
                        type="checkbox"
                        :value="location"
                        v-model="multiSelectLocation"
                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </td>

                  <td class="px-4 py-3">
                    <div class="flex items-center text-sm">
                      <!-- Simple avatar with the first letter of the email -->
                      <div
                        class="mr-12 flex w-8 h-8 rounded-full border bg-white text-center"
                        :style="{
                          'border-color': stringToColor(location.name),
                        }"
                      >
                        <div
                          class="mx-auto my-auto text-md"
                          :style="{
                            color: stringToColor(location.name),
                          }"
                        >
                          {{ location.name[0].toUpperCase() }}
                        </div>
                      </div>
                      <div>
                        <p class="font-semibold my-auto">
                          {{ location.name }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 w-1/3 text-xs max-w-md whitespace-pre-wrap overflow-hidden overflow-wrap">
                    <p class="my-auto">{{ location.description }}</p>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                      <!--<button
                        v-if="currentUser.role == 'Admin'"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-indigo-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        @click="editLocation(location.name, location.description)"
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        v-else
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-gray-200 rounded-lg focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                          ></path>
                        </svg>
                      </button>-->

                      <button
                        v-if="currentUser.role == 'Admin'"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-indigo-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                        @click="
                          removeLocation(location.name)
                        "
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="flex w-full text-right px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
          >
            <pagination-component
              :total-pages="totalPages"
              :total="total"
              :per-page="perPage"
              :current-page="currentPage"
              :has-more-pages="hasMorePages"
              @pagechanged="showMore"
            >
            </pagination-component>
          </div>
        </div>
      </div>
    </main>
    <modal-creation-location-component
      v-show="openCreationLocationModal"
      :open="openCreationLocationModal"
      v-on:closeModal="closeCreationLocationModal"
    />
  </div>
</template>
<script>
//import api from "../services/api";
import Location from "../models/location";
import LocationService from "../services/location.service"
import BreadcrumbComponent from "../components/Breadcrumb.vue";
import ModalCreationLocationComponent from "../components/ModalCreationLocation.vue";
import PaginationComponent from "../components/Pagination.vue";
import NotificationComponent from "../components/Notifications.vue";

import _ from "lodash";

import stringToColor from "../utils/string2color";

export default {
  name: "dasboard-view",
  data() {
    return {
      listLocations: [],
      multiSelectLocation: [],
      openCreationLocationModal: false,
      selectedLocation: new Location("", ""),
      currentPage: 1,
      page: 1,
      totalPages: 1,
      perPage: 10,
      total: 10,
      hasMorePages: true,
      currentNotification: {},
    };
  },

  async mounted() {
    //console.log(this.$store);
    if (!this.currentUser) {
      this.$router.push("/login");
    } else {
      await this.fetchAllLocations();
    }
  },
  components: {
    BreadcrumbComponent,
    ModalCreationLocationComponent,
    PaginationComponent,
    NotificationComponent,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    orderedLocations: function () {
      return _.sortBy(
        _.slice(this.listLocations,
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        ),
        "name"
      );
    },
  },
  watch: {
    orderedLocations() {
      this.total = this.listLocations.length;
      this.totalPages =
        this.total % this.perPage == 0
          ? Math.floor(this.total / this.perPage)
          : Math.floor(this.total / this.perPage) + 1;
    },
  },
  methods: {
    closeCreationLocationModal(notification) {
      this.openCreationLocationModal = false;
      this.currentNotification = {
        message: notification.message,
        type: notification.type,
      };
      this.fetchAllLocations();
    },
    async fetchAllLocations() {
      LocationService.getAllLocations()
        .then((response) => {
          this.listLocations = JSON.parse(response.data.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    removeLocation(name) {
      this.$dialog
        .confirm("Delete location?", "This action is permanent", "warning")
        .then((result) => {
          if (result.isOk) {
            LocationService.removeLocation(
              name,
              this.currentUser.accessToken
            )
              .then(() => {
                this.currentNotification = {
                  message: "The location has been deleted",
                  type: "success",
                };
                this.fetchAllLocations();
              })
              .catch((err) => {
                console.log(err.response);
              });
          }
        });
    },
    removeAllSelectedLocations() {
      this.$dialog
        .confirm(
          "Delete all selected locations?",
          "This action is permanent",
          "danger"
        )
        .then((result) => {
          if (result.isOk) {
            this.multiSelectLocation.forEach((element) => {
              LocationService.removeLocation(
                element.name,
                this.currentUser.accessToken
              )
                .then(() => {
                  this.fetchAllLocations();
                })
                .catch((err) => {
                  console.log(err.response);
                });
            });
            this.multiSelectLocation = [];
          }
        });
    },
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
    stringToColor,
  },
};
</script>
