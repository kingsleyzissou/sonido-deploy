<template>
  <fragment>
    <h1>Logged out</h1>
  </fragment>
</template>

<script>
export default {
  auth: false,
  mounted() {
    this.$auth.logout();
  }
};
</script>