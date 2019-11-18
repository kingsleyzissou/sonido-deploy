<template>
  <fragment>
    <artist-card :artist="artist"></artist-card>
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
import ArtistCard from "~/components/Cards/Artist";
import NewReleases from "~/components/NewReleases/Show";
import Tracklist from "~/components/Tracklist";
import Similar from "~/components/Artist/Similar";
import Albums from "~/components/Artist/Albums";

export default {
  layout: "dashboard",
  components: {
    ArtistCard,
    NewReleases,
    Tracklist,
    Similar,
    Albums
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