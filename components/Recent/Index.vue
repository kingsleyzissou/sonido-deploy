<template>
  <fragment>
    <template v-if="!loading">
      <div class="row">
        <div class="col-12">
          <card type="plain" class="mb-0">
            <h3 class="card-title mb-0">Recently Played</h3>
          </card>
        </div>
      </div>
      <tracklist :tracks="recents" :full="true"></tracklist>
    </template>
  </fragment>
</template>

<script>
import Tracklist from "../Tracklist";
export default {
  components: { Tracklist },
  data() {
    return {
      loading: true,
      data: {
        recents: []
      }
    };
  },
  async mounted() {
    const { items } = await this.$axios.$get(
      "https://api.spotify.com/v1/me/player/recently-played"
    );
    let recents = items.map(item => item.track);
    this.data.recents = recents;
    this.loading = false;
  },
  computed: {
    recents() {
      return this.data.recents;
    }
  }
};
</script>