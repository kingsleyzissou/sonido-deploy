<template>
  <div class="row">
    <div class="col-lg-3" v-for="(playlist,index) in playlists" :key="index">
      <a :href="`/playlists/${playlist.id}`" class="card bg-dark text-white text-center">
        <img class="card-img" :src="playlist.images[0].url" alt="Card image" />
        <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
          <h3 class="card-title">{{playlist.name}}</h3>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return { list: [] };
  },
  async mounted() {
    this.$axios
      .$get(`/browse/categories/${this.id}/playlists`)
      .then(({ playlists }) => {
        const { items } = playlists;
        console.log(items);
        this.list = items;
      });
  },
  computed: {
    playlists() {
      return this.list;
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