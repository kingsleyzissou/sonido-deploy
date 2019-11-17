<template>
  <fragment>
    <artist-card :artist="artist"></artist-card>
    <div class="row d-flex flex-row">
      <div class="col-8">
        <card style="height: 100%">
          <new-releases :artist="$route.params.id" />
          <h3 class="mb-0">Top Tracks</h3>
          <tracklist :tracks="toptracks" />
        </card>
      </div>
      <div class="col-4">
        <card style="height: 100%">
          <h3 class="mb-1">Similar artists</h3>
          <similar :artists="similar.slice(0,7)" />
        </card>
      </div>
    </div>
  </fragment>
</template>

<script>
import numbro from "numbro";
import ArtistCard from "~/components/Cards/Artist";
import NewReleases from "~/components/NewReleases/Show";
import Tracklist from "~/components/Tracklist";
import Similar from "~/components/Artist/Similar";

export default {
  layout: "dashboard",
  components: {
    ArtistCard,
    NewReleases,
    Tracklist,
    Similar
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
  filters: {
    stripLink(summary) {
      return summary.split("<a")[0];
    }
  }
};
</script>