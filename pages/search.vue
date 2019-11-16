<template>
  <fragment>{{$route.query}}</fragment>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      q: this.$route.query.q
    };
  }
};
</script>