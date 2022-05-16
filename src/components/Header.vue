<template>
  <div
    class="fixed w-full z-10 py-4 bg-white shadow-md dark:bg-gray-800"
    :class="{
      'bg-purple-50': currentUser.role == 'Admin',
      'bg-yellow-50': currentUser.role == 'Printer',
    }"
  >
    <div
      class="flex items-center justify-between h-full px-6 mx-auto"
      :class="{
        'text-purple-600': currentUser.role == 'Admin',
        'text-yellow-700': currentUser.role == 'Printer',
      }"
    >
      <!-- Mobile hamburger -->
      <div class="flex justify-left flex-1 ml-64">
        <span class="font-bold text-xl" v-if="currentUser.role == 'Admin'"
          >Administrator
        </span>
        <span class="font-bold text-xl" v-if="currentUser.role == 'Printer'"
          >Printer
        </span>
      </div>
      <ul class="flex items-center flex-shrink-0 space-x-6">
        <!-- Profile menu -->
        <li class="relative">
          <button
            class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
            aria-label="Account"
            aria-haspopup="true"
          >
            <div
              class="flex w-10 h-10 rounded-full bg-purple-700 text-center"
              :style="{
                'background-color': stringToColor(currentUser.user),
              }"
            >
              <div class="mx-auto my-auto text-lg text-white">
                {{ currentUser.user[0].toUpperCase() }}
              </div>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import stringToColor from "../utils/string2color";
export default {
  name: "header-component",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    stringToColor,
  },
};
</script>
