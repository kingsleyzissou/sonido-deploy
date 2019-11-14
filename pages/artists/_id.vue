<template>
  <fragment>
    <artist-card :artist="artist"></artist-card>
  </fragment>
</template>

<script>
import numbro from "numbro";
import ArtistCard from "~/components/Artist/Card";

export default {
  layout: "dashboard",
  components: {
    ArtistCard
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/artists/${params.id}`);
    return {
      artist: data
    };
  },
  filters: {
    stripLink(summary) {
      return summary.split("<a")[0];
    }
  }
};
</script>