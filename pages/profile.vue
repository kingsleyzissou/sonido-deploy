<template>
  <fragment>
    <!-- <Navbar></Navbar> -->
    <section class="hero is-black has-bg-img is-medium">
      <div class="hero-body"></div>
      <div class="hero-foot">
        <div class="container has-text-centered">
          <div class="container has-text-centered">
            <h1 class="title">{{user.display_name}}</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="container" style="margin-top: -300px">
      <div class="columns">
        <div class="column is-one-quarter">
          <div class="card">
            <div class="card-image">
              <figure class="image is-square">
                <img :src="user.images[0].url" alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content">
              <!-- <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img
                      src="https://bulma.io/images/placeholders/96x96.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">John Smith</p>
                  <p class="subtitle is-6">@johnsmith</p>
                </div>
              </div>-->
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                <a>@bulmaio</a>.
                <a href="#">#css</a>
                <a href="#">#responsive</a>
                <br />
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="container" style="margin-top: -100px">
      <figure class="image is-256by256" style="border: 10px #fff solid; width:256px">
        <img :src="user.images[0].url" alt="profile picture" />
      </figure>
    </section>-->
  </fragment>
</template>

<script>
// import Navbar from "~/components/Navbar";
export default {
  components: {
    // Navbar
  },
  data() {
    return {
      user: this.$auth.$state.user
    };
  }
};
</script>