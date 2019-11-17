<template>
  <fragment>
    <user-card :user="$auth.$state.user"></user-card>
    <recently-played></recently-played>
  </fragment>
</template>

<script>
import UserCard from "~/components/Cards/User";
import RecentlyPlayed from "~/components/Recent";

export default {
  layout: "dashboard",
  components: {
    UserCard,
    RecentlyPlayed
  },
  data() {
    return {
      user: this.$auth.$state.user
    };
  }
};
</script>