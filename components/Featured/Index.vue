<template>
  <fragment>
    <div class="row">
      <div class="col-lg-3" v-for="(playlist,index) in playlists" :key="index">
        <template v-if="playlist">
          <a :href="`/playlists/${playlist.id}`" class="card bg-dark text-white text-center">
            <img class="card-img" :src="playlist.images[0].url" alt="Card image" />
            <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
              <h3 class="card-title">{{playlist.name}}</h3>
            </div>
          </a>
        </template>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  data() {
    return { data: { playlists: [] } };
  },
  async mounted() {
    let { message, playlists } = await this.$axios.$get(
      "/browse/featured-playlists"
    );
    this.data.playlists = playlists.items;
  },
  computed: {
    playlists() {
      return this.data.playlists;
    }
  }
};
</script>

<style scoped>
.card:hover > .card-img {
  /* scale(1.2,1.2) */
  opacity: 0.5;
}
</style>