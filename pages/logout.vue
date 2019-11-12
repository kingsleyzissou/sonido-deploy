<template>
  <div>
    <h1>Logged out</h1>
  </div>
</template>

<script>
export default {
  auth: false,
  mounted() {
    this.$auth.logout();
  }
};
</script>