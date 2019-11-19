<template>
  <fragment>
    <div class="row">
      <div class="col-12">
        <card>
          <h6 class="mb-0">Track</h6>
          <h2 class="album-title">{{track.name}}</h2>
          <span>by</span>
          <h6 class="muted" v-html="$options.filters.stringify(track.artists)"></h6>
          <!-- <ul class="list-inline mb-0">
            <li class="list-inline-item">{{ album.release_date | getYear }}&nbsp;&nbsp;|</li>
            <li class="list-inline-item">{{ album.total_tracks | pluralise }}&nbsp;&nbsp;|</li>
            <li class="list-inline-item">{{ album.tracks.items | getDuration }}</li>
          </ul>-->
          <button class="btn btn-primary">Play</button>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="plain" class="mb-0">
          <h2 class="card-title">Audio Analysis</h2>
        </card>
      </div>
    </div>
    <ul class="nav">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{'active': active[0]}"
          href="#home"
          @click.prevent="switchTab(0)"
        >Analysis</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{'active': active[1]}"
          href="#home"
          @click.prevent="switchTab(1)"
        >Features</a>
      </li>
    </ul>
    <div v-show="active[0]">
      <analysis :id="$route.params.id"></analysis>
    </div>
    <div v-show="active[1]">
      <features :id="$route.params.id"></features>
    </div>
  </fragment>
</template>

<script>
import Analysis from "~/components/Track/Analysis.vue";
import Features from "~/components/Track/Features.vue";
import createArtistLink from "~/assets/js/createArtistLink";

export default {
  layout: "dashboard",
  components: { Analysis, Features },
  data() {
    return {
      active: [true, false],
      data: {
        track: {}
      }
    };
  },
  async mounted() {
    const { data } = await this.$axios.get(`/tracks/${this.$route.params.id}`);
    this.data.track = data;
  },
  methods: {
    switchTab(index) {
      this.active = this.active.map((tab, i) => i == index);
    }
  },
  computed: {
    track() {
      return this.data.track;
    }
  },
  filters: {
    stringify(artists) {
      if (artists) {
        const keys = artists.length;
        if (keys === 1) return createArtistLink(artists[0]);
        if (keys < 3) return artists.map(a => createArtistLink(a)).join(", ");
        artists = artists.slice(0, 2);
        return artists.map(a => createArtistLink(a)).join(", ") + "...";
      }
    }
  }
};
</script>