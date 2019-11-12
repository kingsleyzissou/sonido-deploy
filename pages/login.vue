<template>
  <div>
    <section class="hero is-black has-bg-img is-fullheight">
      <!-- Hero head: will stick at the top -->
      <Navbar></Navbar>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
              <div class="box" style="border-radius: 0; box-shadow:none; padding: 4em 2em">
                <!-- <figure class="avatar">
                    <img src="https://placehold.it/128x128">
                </figure>-->
                <i class="has-text-black fas fa-anchor fa-3x" style="margin-bottom:0.5em"></i>
                <h1 class="title has-text-black">Login</h1>
                <button class="button is-block is-black is-large is-fullwidth" @click="login">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";
export default {
  auth: false,
  components: {
    Navbar
  },
  methods: {
    login() {
      this.$auth.loginWith("spotify");
    }
  }
};
</script>
