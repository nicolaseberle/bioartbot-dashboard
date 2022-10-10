<template>
  <div class="py-4 text-gray-500">
    <router-link
      class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
      to="/"
    >
      <div class="-mt-5 ml-6">BioArtBot System Dashboard</div>
    </router-link>
    <ul class="mt-20">
      <!--<span
          class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
          aria-hidden="true"
        ></span>-->
      <router-link
        class="inline-flex relative px-6 py-3 items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 hover:bg-gray-100"
        :class="[
          $route.name === 'Dashboard' || $route.name === 'DashboardArtist'
            ? activeClass
            : inactiveClass,
        ]"
        to="/dashboard"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <path
            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
          ></path>
        </svg>
        <span class="ml-4">Users</span>
      </router-link>
    </ul>

    <router-link
      class="inline-flex pl-12 my-auto py-3 text-sm hover:bg-gray-100 transition-colors duration-150 hover:text-gray-800 items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
      :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]"
      to="/dashboard"
    >
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        fill="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="none"
      ></svg>
      <span class="">Admin & Printers</span>
    </router-link>

    <!--<router-link     <!- Commented out until Artist API is available
      class="inline-flex pl-12 my-auto py-3 text-sm hover:bg-gray-100 transition-colors duration-150 hover:text-gray-800 items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
      :class="[$route.name === 'DashboardArtist' ? activeClass : inactiveClass]"
      to="/dashboard_artist"
    >
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        fill="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="none"
      ></svg>
      <span class="">Artists</span>
    </router-link>-->

    <router-link
      class="inline-flex relative px-6 py-3 mt-4 items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 hover:bg-gray-100"
      :class="[$route.name === 'Profile' ? activeClass : inactiveClass]"
      to="/profile"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <span class="mx-4">Profile</span>
    </router-link>

    <div
      class="inline-flex relative px-6 py-3 items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
      :class="[$route.name === 'Logout' ? activeClass : inactiveClass]"
      href
      @click.prevent="logOut"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>

      <span class="ml-4">Log out</span>
    </div>
  </div>

  <!-- Mobile sidebar -->
  <!-- Backdrop -->
</template>
<script>
export default {
  name: "sidebar-component",
  data() {
    return {
      isPagesMenuOpen: false,
      inactiveClass: "",
      activeClass: "",
    };
  },
  methods: {
    togglePagesMenu() {
      this.isPagesMenuOpen = !this.isPagesMenuOpen;
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
