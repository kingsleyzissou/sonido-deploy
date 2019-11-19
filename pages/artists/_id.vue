<template>
  <fragment>
    <artist-card :artist="artist"></artist-card>
    <bio :artist="artist" v-on:mbid="change" />
    <div class="row d-flex flex-row">
      <div class="col-8">
        <card style="height: 100%" class="mb-0">
          <new-releases :artist="$route.params.id" />
          <card type="plain" class="mb-0">
            <h3 class="mb-0">Top Tracks</h3>
          </card>
          <tracklist :tracks="toptracks" />
        </card>
      </div>
      <div class="col-4">
        <card style="height: 100%" class="mb-0">
          <h3 class="mb-1">Similar artists</h3>
          <similar :artists="similar.slice(0,7)" />
        </card>
      </div>
    </div>
    <hr />
    <albums :artist="$route.params.id" type="album" />
  </fragment>
</template>

<script>
import numbro from "numbro";
import ArtistCard from "~/components/Cards/Artist.vue";
import NewReleases from "~/components/NewReleases/Show.vue";
import Tracklist from "~/components/Tracklist/Index.vue";
import Similar from "~/components/Artist/Similar.vue";
import Albums from "~/components/Artist/Albums.vue";
import Bio from "~/components/Artist/Bio.vue";

export default {
  layout: "dashboard",
  components: {
    ArtistCard,
    NewReleases,
    Tracklist,
    Similar,
    Albums,
    Bio
  },
  data() {
    return {
      mbid: ""
    };
  },
  async asyncData({ $axios, params }) {
    const [artist, similar, toptracks] = await Promise.all([
      $axios.get(`/artists/${params.id}`),
      $axios.get(`/artists/${params.id}/related-artists`),
      $axios.get(`/artists/${params.id}/top-tracks`, {
        params: { country: "from_token" }
      })
    ]);
    return {
      artist: artist.data,
      similar: similar.data.artists,
      toptracks: toptracks.data.tracks
    };
  },
  methods: {
    change(event) {
      this.mbid = event;
    }
  },
  filters: {
    stripLink(summary) {
      return summary.split("<a")[0];
    }
  }
};
</script>