<template>
  <fragment>
    <div v-if="tracks.length > 0">
      <tracklist :tracks="tracks" />
    </div>
  </fragment>
</template>

<script>
import Tracklist from "./Index.vue";

export default {
  props: ["album"],
  components: {
    Tracklist
  },
  data() {
    return {
      data: {
        tracks: []
      }
    };
  },
  async mounted() {
    const { data } = await this.$axios.get(`/albums/${this.album}`);
    this.data.tracks = data.tracks.items;
  },
  computed: {
    tracks() {
      return this.data.tracks;
    }
  }
};
</script>