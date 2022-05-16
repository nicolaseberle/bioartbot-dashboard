<template>
  <div class="fixed right-0 justify-end mr-6 w-64">
    <t-alert
      :variant="currentNotifcation.type"
      :timeout="4000"
      :show="currentNotifcation.show"
      @hidden="removeNotification()"
    >
      {{ currentNotifcation.message }}
    </t-alert>
  </div>
</template>
<script>
export default {
  name: "notifcation-component",
  props: ["notification"],
  data() {
    return {
      currentNotifcation: {
        message: "",
        type: "danger",
        show: false,
      },
    };
  },
  watch: {
    notification(newNotification) {
      this.currentNotifcation = {
        message: newNotification.message,
        type: newNotification.type,
        show: true,
      };
    },
  },
  methods: {
    removeNotification() {
      this.currentNotifcation = {
        message: "",
        type: "danger",
        show: false,
      };
    },
  },
};
</script>
