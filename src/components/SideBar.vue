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

    <router-link
      class="inline-flex relative px-6 py-3 mt-4 items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 hover:bg-gray-100"
      :class="[$route.name === 'Locations' ? activeClass : inactiveClass]"
      to="/locations"
    >
      <svg
        class="h-5 w-5 mr-1"
        viewBox="0 0 100.353 100.352"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        stroke-width="3"
        ><g>
          <path 
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M58.23,69.992l14.993-24.108c0.049-0.078,0.09-0.16,0.122-0.245c2.589-4.222,3.956-9.045,3.956-13.969   c0-14.772-12.018-26.79-26.79-26.79S23.72,16.898,23.72,31.67c0,4.925,1.369,9.75,3.96,13.975c0.03,0.074,0.065,0.146,0.107,0.216   l14.455,24.191c-11.221,1.586-18.6,6.2-18.6,11.797c0,6.935,11.785,12.366,26.829,12.366S77.3,88.783,77.3,81.849   C77.301,76.226,69.578,71.509,58.23,69.992z M30.373,44.294c-2.39-3.804-3.653-8.169-3.653-12.624   c0-13.118,10.672-23.79,23.791-23.79c13.118,0,23.79,10.672,23.79,23.79c0,4.457-1.263,8.822-3.652,12.624   c-0.05,0.08-0.091,0.163-0.124,0.249L54.685,70.01c-0.238,0.365-0.285,0.448-0.576,0.926l-4,6.432L30.507,44.564   C30.472,44.471,30.427,44.38,30.373,44.294z M50.472,91.215c-14.043,0-23.829-4.937-23.829-9.366c0-4.02,7.37-7.808,17.283-8.981   l4.87,8.151c0.269,0.449,0.751,0.726,1.274,0.73c0.004,0,0.009,0,0.013,0c0.518,0,1-0.268,1.274-0.708l5.12-8.232   C66.548,73.9,74.3,77.784,74.3,81.849C74.301,86.279,64.515,91.215,50.472,91.215z"/>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M60.213,31.67c0-5.371-4.37-9.741-9.741-9.741s-9.741,4.37-9.741,9.741s4.37,9.741,9.741,9.741   C55.843,41.411,60.213,37.041,60.213,31.67z M43.731,31.67c0-3.717,3.024-6.741,6.741-6.741s6.741,3.024,6.741,6.741   s-3.023,6.741-6.741,6.741S43.731,35.387,43.731,31.67z"/>
        </g>
      </svg>
      <span class="mx-4">Locations</span>
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
