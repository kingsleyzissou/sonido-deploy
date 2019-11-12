<template>
  <fragment>
    <Navbar></Navbar>
    <section class="hero is-black has-bg-img is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Welcome to Webmark.io</h1>
          <h2
            class="subtitle"
          >The easiest way to keep your bookmarks organised and up to date. Bookmark.io is a web app designed to help you keep track of your bookmarks in an easy and efficient way.</h2>
          <a class="button is-primary is-medium is-inverted is-outlined">Get Started</a>
        </div>
      </div>
      <div class="hero-foot"></div>
    </section>
  </fragment>
</template>

<script>
import Navbar from "~/components/Navbar";
export default {
  components: {
    Navbar
  },
  auth: false,
  mounted() {
    // console.log(this.$state);
    console.log(this.$auth);
  }
};
</script>

<style scoped>
.is-black {
  background-color: #222;
}
</style>
