<template>
  <fragment>
    <div class="row">
      <div class="col-lg-3" v-for="(recommendation,index) in recommendations" :key="index">
        <a :href="`/categories/${recommendation.id}`" class="card bg-dark text-white text-center">
          <img class="card-img" :src="recommendation.album.images[0].url" alt="Card image" />
          <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
            <h3 class="card-title">{{recommendation.name}}</h3>
          </div>
        </a>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  data() {
    return {
      data: {
        recommendations: []
      }
    };
  },
  async mounted() {
    let seed_artists = this.$store.state.top.artists
      .slice(0, 2)
      .map(artist => {
        return artist.id;
      })
      .join(",");
    let seed_tracks = this.$store.state.top.tracks
      .slice(0, 3)
      .map(track => {
        return track.id;
      })
      .join(",");
    let { tracks } = await this.$axios.$get("/recommendations", {
      params: {
        seed_tracks,
        seed_artists
      }
    });
    this.data.recommendations = tracks;
  },
  computed: {
    recommendations() {
      return this.data.recommendations;
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