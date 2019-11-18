<template>
  <fragment>
    <div class="row">
      <div class="col-12">
        <h2>{{title}}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3" v-for="(album,index) in albums" :key="index">
        <template v-if="album">
          <a :href="`/albums/${album.id}`" class="card bg-dark text-white text-center">
            <img class="card-img" :src="album.images[0].url" alt="Card image" />
            <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
              <h3 class="card-title">{{album.name}}</h3>
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
    return { title: "Top Tracks", data: { tracks: [] } };
  },
  async mounted() {
    let { albums } = await this.$axios.$get("/browse/new-releases");
    this.data.albums = albums.items;
  },
  computed: {
    albums() {
      return this.data.albums;
    }
  }
};
</script>

<style scoped>
.card:hover > .card-img {
  opacity: 0.5;
}
</style>