<template>
  <fragment>
    <top-navbar></top-navbar>
    <div class="hero d-flex justify-content-center align-items-center">
      <div class="container text-center">
        <i class="tim-icons icon-sound-wave hero-icon"></i>
        <h1 class="hero-title">Sonido</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa veniam ut labore quo? Perferendis impedit quasi sint excepturi. At deserunt aperiam maxime recusandae quo sit molestias odio sint animi consequatur.</p>
        <nuxt-link to="/dashboard">
          <base-button simple type="primary" class="mt-4">Get started</base-button>
        </nuxt-link>
      </div>
    </div>
  </fragment>
</template>

<script>
import TopNavbar from "~/ui/Layout/TopNavbar.vue";
export default {
  auth: false,
  components: {
    TopNavbar
  }
};
</script>

<style scoped>
.hero {
  height: 100vh;
  width: 100vw;
}

.hero-title {
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 10px;
}

.hero-icon {
  font-size: 72px;
  color: #fff;
  margin-bottom: 24px;
}
</style>