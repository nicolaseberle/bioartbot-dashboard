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
            { id: 1, name: 'Users' },
            { id: 2, name: 'Admins & Printers' },
          ]"
        />
        <div class="flex flex-row justify-between">
          <div
            class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Users -
            <span class="text-lg"
              >Admins & Printers<span class="text-gray-500 ml-2 font-light"
                >({{ total }})</span
              ></span
            >
          </div>
          <!-- Button during multi-selection -->
          <div
            v-if="multiSelectUser.length > 0 && currentUser.role == 'Admin'"
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
                  class="px-4 py-3 mr-auto w-full text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  role="menuitem"
                  @click="
                    changeRoleForAll('Admin');
                    hide();
                  "
                >
                  Convert to Admin
                </button>
                <button
                  class="px-4 py-3 w-full text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  role="menuitem"
                  @click="
                    changeRoleForAll('Printer');
                    hide();
                  "
                >
                  Convert to Printer
                </button>
                <button
                  class="border-t border-gray-200 px-4 py-3 w-full text-left text-sm leading-5 text-red-500 transition duration-150 ease-in-out hover:bg-red-100 focus:outline-none focus:bg-red-100"
                  role="menuitem"
                  @click="
                    removeAllSelectedUsers();
                    hide();
                  "
                >
                  Remove selection
                </button>
              </div>
            </t-dropdown>
          </div>
          <!-- Button add user -->
          <div class="my-auto">
            <button
              v-if="currentUser.role == 'Admin'"
              class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-500 focus:outline-none focus:shadow-outline-purple"
              @click="openCreationUserModal = true"
            >
              <span class="mr-2 font-bold" aria-hidden="true">+</span>
              Add user
            </button>
          </div>
        </div>
        <!-- Filters -->
        <div class="flex flex-row justify-start mb-4 space-x-2">
          <button
            class="focus:outline-none active:outline-none"
            @click="filterSwitchFor('Admin')"
          >
            <span
              class="text-xs px-4 py-3 mx-auto border-2 border-transparent font-semibold leading-tight rounded-lg focus:outline-none active:outline-none"
              :class="{
                'bg-purple-100 text-purple-700': filter.includes('Admin'),
                'bg-white text-gray-200 hover:border hover:border-purple-500 ':
                  !filter.includes('Admin'),
              }"
            >
              Admin
            </span>
          </button>
          <button
            class="focus:outline-none active:outline-none"
            @click="filterSwitchFor('Printer')"
          >
            <span
              class="text-xs px-4 py-3 mx-auto border-2 border-transparent font-semibold leading-tight rounded-lg focus:outline-none active:outline-none"
              :class="{
                'bg-yellow-100 text-yellow-700': filter.includes('Printer'),
                'bg-white text-gray-200 hover:border hover:border-yellow-300 ':
                  !filter.includes('Printer'),
              }"
            >
              Printer
            </span>
          </button>
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
                  <th class="pl-24 py-3">Creation date</th>
                  <th class="px-4 py-3 w-1/3">Email</th>
                  <th class="px-4 py-3">Role</th>
                  <th class="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <!-- Body of the Table -->
              <tbody
                class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              >
                <tr
                  v-for="user in orderedUsers"
                  :key="user.id"
                  class="text-gray-700 dark:text-gray-400"
                >
                  <td class="px-4 py-3 my-auto text-sm">
                    <div class="flex items-center">
                      <input
                        v-if="currentUser.role == 'Admin'"
                        id="default-checkbox"
                        type="checkbox"
                        :value="user"
                        v-model="multiSelectUser"
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
                          'border-color': stringToColor(user.email),
                        }"
                      >
                        <div
                          class="mx-auto my-auto text-md"
                          :style="{
                            color: stringToColor(user.email),
                          }"
                        >
                          {{ user.email[0].toUpperCase() }}
                        </div>
                      </div>
                      <div>
                        <p class="font-semibold my-auto">
                          {{ user.created_at | moment("DD/MM/YYYY") }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 w-1/3 text-sm">
                    <p class="font-semibold my-auto">{{ user.email }}</p>
                  </td>

                  <td>
                    <!-- dropdown selector to chose role -->
                    <t-dropdown>
                      <div
                        slot="trigger"
                        slot-scope="{
                          mousedownHandler,
                          focusHandler,
                          blurHandler,
                          keydownHandler,
                        }"
                        class="flex border border-gray-200 rounded-md focus:outline-none active:outline-none"
                        :class="{
                          'border-0 border-none': currentUser.role == 'Printer',
                        }"
                      >
                        <div
                          class="px-4 py-3 text-xs w-24 focus:outline-none active:outline-none"
                        >
                          <span
                            class="px-3 py-2 mx-auto font-semibold leading-tight rounded-lg"
                            :class="{
                              'text-yellow-700 bg-yellow-100':
                                user.role == 'Printer',
                              'text-purple-700 bg-purple-100':
                                user.role == 'Admin',
                            }"
                          >
                            {{ user.role }}
                          </span>
                        </div>
                        <button
                          v-if="currentUser.role == 'Admin'"
                          class="flex items-center justify-center flex-shrink-0 px-3 py-2 text-white rounded-r hover:bg-gray-100"
                          @mousedown="mousedownHandler"
                          @focus="focusHandler"
                          @blur="blurHandler"
                          @keydown="keydownHandler"
                        >
                          <svg
                            class="w-4 h-4 text-gray-500 fill-current"
                            viewBox="0 0 20 20"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="currentColor"
                              fill-rule="none"
                            >
                              <g id="icon-shape">
                                <polygon
                                  id="Combined-Shape"
                                  points="9.29289322 12.9497475 10 13.6568542 15.6568542 8 14.2426407 6.58578644 10 10.8284271 5.75735931 6.58578644 4.34314575 8"
                                />
                              </g>
                            </g>
                          </svg>
                        </button>
                      </div>

                      <div slot-scope="{ hide }" class="flex flex-col">
                        <button
                          class="px-4 py-2 my-1 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          role="menuitem"
                          @click="
                            changeRole(user.id, user.email, 'Admin');
                            hide();
                          "
                        >
                          <span
                            class="text-xs px-3 py-2 mx-auto font-semibold leading-tight text-purple-700 bg-purple-100 rounded-lg"
                          >
                            Admin
                          </span>
                        </button>
                        <button
                          class="px-4 py-2 mb-1 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          role="menuitem"
                          @click="
                            changeRole(user.id, user.email, 'Printer');
                            hide();
                          "
                        >
                          <span
                            class="text-xs px-3 py-2 mx-auto font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-lg"
                          >
                            Printer
                          </span>
                        </button>
                      </div>
                    </t-dropdown>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                      <button
                        v-if="currentUser.role == 'Admin'"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-indigo-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                        aria-label="Send"
                        @click="sendInvitation(user.email)"
                      >
                        <font-awesome-icon icon="paper-plane" />
                      </button>
                      <button
                        v-else
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-gray-200 rounded-lg focus:outline-none focus:shadow-outline-gray"
                        aria-label="Send"
                      >
                        <font-awesome-icon icon="paper-plane" />
                      </button>

                      <button
                        v-if="currentUser.role == 'Admin'"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-indigo-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        @click="editSuperUser(user.id, user.email, user.role)"
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
                      </button>

                      <button
                        v-if="currentUser.role == 'Admin'"
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-indigo-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                        @click="
                          removeUser(user.id, user.email, user.created_at)
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
    <modal-creation-user-component
      v-show="openCreationUserModal"
      :open="openCreationUserModal"
      v-on:closeModal="closeCreationUserModal"
    />
    <modal-edit-user-component
      v-show="openEditUserModal"
      :open="openEditUserModal"
      :selectedUser="selectedUser"
      v-on:closeModal="closeEditUserModal"
    />
  </div>
</template>
<script>
//import api from "../services/api";
import User from "../models/user";
import AdminService from "../services/admin.service";
import BreadcrumbComponent from "../components/Breadcrumb.vue";
import ModalCreationUserComponent from "../components/ModalCreationUser.vue";
import ModalEditUserComponent from "../components/ModalEditUser.vue";
import PaginationComponent from "../components/Pagination.vue";
import NotificationComponent from "../components/Notifications.vue";

import _ from "lodash";

import stringToColor from "../utils/string2color";

export default {
  name: "dasboard-view",
  data() {
    return {
      listUsers: [],
      multiSelectUser: [],
      openCreationUserModal: false,
      openEditUserModal: false,
      selectedUser: new User("", "", "", "", ""),
      currentPage: 1,
      page: 1,
      totalPages: 1,
      perPage: 10,
      total: 10,
      hasMorePages: true,
      currentNotification: {},
      filter: ["Admin", "Printer"],
    };
  },

  async mounted() {
    console.log(this.$store);
    if (!this.currentUser) {
      this.$router.push("/login");
    } else {
      await this.fetchAllUsers();
    }
  },
  components: {
    BreadcrumbComponent,
    ModalCreationUserComponent,
    ModalEditUserComponent,
    PaginationComponent,
    NotificationComponent,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    orderedUsers: function () {
      let res = _.filter(this.listUsers, ({ role }) =>
        _.every([_.includes(this.filter, role)])
      );

      return _.sortBy(
        res.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        ),
        "created_at"
      );
    },
  },
  watch: {
    orderedUsers() {
      let res = _.filter(this.listUsers, ({ role }) =>
        _.every([_.includes(this.filter, role)])
      );
      this.total = res.length;
      this.totalPages =
        this.total % this.perPage == 0
          ? Math.floor(this.total / this.perPage)
          : Math.floor(this.total / this.perPage) + 1;
    },
  },
  methods: {
    filterSwitchFor(name) {
      if (this.filter.includes(name)) {
        //remove name from the filter list
        this.filter = this.filter.filter((el) => el !== name);
      } else {
        //add name in the filter list
        this.filter.push(name);
      }
      this.page = 1;
      this.currentPage = 1;
    },
    closeEditUserModal(notification) {
      this.openEditUserModal = false;
      this.currentNotification = {
        message: notification.message,
        type: notification.type,
      };
      this.fetchAllUsers();
    },
    closeCreationUserModal(notification) {
      this.openCreationUserModal = false;
      this.currentNotification = {
        message: notification.message,
        type: notification.type,
      };
      this.fetchAllUsers();
    },
    async fetchAllUsers() {
      AdminService.getAllUsers()
        .then((response) => {
          this.listUsers = response.data.users;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    sendInvitation(email) {
      this.$dialog
        .confirm({
          title: `Are you sure you want to send an email to ${email} to reset his password?`,
          icon: "info",
          cancelButtonText: "Cancel",
          okButtonText: "Send",
        })
        .then((result) => {
          if (result.isOk) {
            this.currentNotification = {
              message: "Invitation sent",
              type: "success",
            };
            AdminService.sendInvitation(email, this.currentUser.accessToken)
              .then((response) => {
                console.log(response);
                if (response.errors) {
                  this.currentNotification = {
                    message: "Invitation not sent",
                    type: "danger",
                  };
                } else {
                  this.currentNotification = {
                    message: "Invitation sent",
                    type: "info",
                  };
                }
              })
              .catch((err) => {
                console.log(err.response);
              });
          }
        });
    },
    removeUser(id, email, utc_creation_date) {
      this.$dialog
        .confirm("Remove user?", "This action will be definitive", "warning")
        .then((result) => {
          if (result.isOk) {
            if (email !== this.currentUser.user) {
              AdminService.removeUser(
                id,
                utc_creation_date,
                this.currentUser.accessToken
              )
                .then(() => {
                  this.currentNotification = {
                    message: "The user has been removed",
                    type: "success",
                  };
                  this.fetchAllUsers();
                })
                .catch((err) => {
                  console.log(err.response);
                });
            } else {
              this.currentNotification = {
                message: "You can't remove yourself",
                type: "danger",
              };
            }
          }
        });
    },
    removeAllSelectedUsers() {
      this.$dialog
        .confirm(
          "Remove all selected users?",
          "This action will be definitive",
          "danger"
        )
        .then((result) => {
          if (result.isOk) {
            this.multiSelectUser.forEach((element) => {
              if (element.email !== this.currentUser.user) {
                AdminService.removeUser(
                  element.id,
                  element.created_at,
                  this.currentUser.accessToken
                )
                  .then(() => {
                    this.fetchAllUsers();
                  })
                  .catch((err) => {
                    console.log(err.response);
                  });
              }
            });
            this.multiSelectUser = [];
          }
        });
    },
    editSuperUser(id, email, role) {
      this.selectedUser.id = id;
      this.selectedUser.email = email;
      this.selectedUser.role = role;
      this.openEditUserModal = true;
    },
    changeRole(id, email, role) {
      if (email !== this.currentUser.user) {
        let index = this.listUsers.findIndex((object) => object.id == id);
        AdminService.updateRole(email, role, this.currentUser.accessToken)
          .then(() => {
            this.listUsers[index].role = role;
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
    changeRoleForAll(newRole) {
      this.$dialog
        .confirm(
          "Change the role of all selected users?",
          "They will be " + newRole,
          "warning"
        )
        .then((result) => {
          if (result.isOk) {
            this.multiSelectUser.forEach((element) => {
              this.changeRole(element.id, element.email, newRole);
            });
            this.multiSelectUser = [];
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
