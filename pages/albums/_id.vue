<template>
  <fragment>
    <album-card :album="album"></album-card>
    <tracklist :tracks="album.tracks.items"></tracklist>
  </fragment>
</template>

<script>
import AlbumCard from "~/components/Cards/Album";
import Tracklist from "~/components/Tracklist";

export default {
  layout: "dashboard",
  components: { AlbumCard, Tracklist },
  data() {
    return {
      loading: false
    };
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/albums/${params.id}`);
    return {
      album: data
    };
  }
};
</script>