<template>
  <user-card :user="$auth.$state.user"></user-card>
</template>

<script>
import UserCard from "~/components/User/Card";
export default {
  layout: "dashboard",
  components: {
    UserCard
  },
  data() {
    return {
      user: this.$auth.$state.user
    };
  }
};
</script>