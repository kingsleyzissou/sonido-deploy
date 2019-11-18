<template>
  <user-card :user="user"></user-card>
</template>

<script>
import UserCard from "~/components/Cards/User";
export default {
  // layout: "dashboard",
  components: {
    UserCard
  },
  async asyncData({ $axios, params }) {
    let { data } = await $axios.get(`/users/${params.id}`);
    return {
      user: data
    };
  }
};
</script>