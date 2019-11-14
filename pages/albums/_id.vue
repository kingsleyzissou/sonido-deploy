<template>
  <fragment></fragment>
</template>

<script>
export default {
  layout: "dashboard",
  components: {},
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/albums/${params.id}`);
    return {
      album: data
    };
  }
};
</script>