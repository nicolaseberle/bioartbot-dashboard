<template>
  <div id="app">
    <div class="flex h-screen bg-gray-50 relative">
      <div
        class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
      >
        <sidebar-component></sidebar-component>
      </div>
      <header-component></header-component>
      <slot />
    </div>
  </div>
</template>

<script>
import SidebarComponent from "../components/SideBar.vue";
import HeaderComponent from "../components/Header.vue";

export default {
  name: "dashboard-layout",
  components: {
    SidebarComponent,
    HeaderComponent,
  },
};
</script>
