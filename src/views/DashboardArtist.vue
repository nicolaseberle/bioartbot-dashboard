<template>
  <!-- Desktop sidebar -->

  <div class="flex flex-col w-full">
    <main class="h-full overflow-y-auto">
      <div class="mt-20 px-6 mx-auto grid">
        <breadcrumb-component
          :breadcrumb="[
            { id: 1, name: 'Users' },
            { id: 2, name: 'Artists' },
          ]"
        />
        <div class="flex flex-row justify-between">
          <div
            class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Users - <span class="text-lg">Artists</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import BreadcrumbComponent from "../components/Breadcrumb.vue";

export default {
  name: "dasboard-view",
  data() {
    return {
      listUsers: [],
    };
  },
  components: { BreadcrumbComponent },
  async mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    } else {
      await this.fetchAllUsers();
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    async fetchAllUsers() {},
  },
};
</script>
