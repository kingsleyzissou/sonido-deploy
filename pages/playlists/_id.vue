<template>
  <fragment>
    <playlist-card :playlist="playlist"></playlist-card>
    <songlist :songs="playlist.tracks.items"></songlist>
  </fragment>
</template>

<script>
import Songlist from "~/components/Songlist/Index.vue";
import PlaylistCard from "~/components/Cards/Playlist.vue";
export default {
  layout: "dashboard",
  components: {
    Songlist,
    PlaylistCard
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/playlists/${params.id}`);
    return { playlist: data };
  }
};
</script>