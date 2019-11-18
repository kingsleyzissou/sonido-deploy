<template>
  <fragment></fragment>
</template>
<script>
import Transport from "~/components/Transport";
export default {
  layout: "dashboard",
  components: {
    Transport
  },
  methods: {
    pause() {
      this.$pause(this.$store, this.$axios);
    },
    unpause() {
      this.$unpause(this.$store, this.$axios);
    }
  }
};
</script>
<style>
</style>
