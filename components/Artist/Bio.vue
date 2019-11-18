<template>
  <card type="plain">
    <h3 class="mb-0">Bio</h3>
    <div class="text-white">
      <div>{{summary}}</div>
    </div>
  </card>
</template>

<script>
export default {
  props: ["artist"],
  data() {
    return {
      data: {
        summary: ""
      }
    };
  },
  async mounted() {
    let url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.artist.name}&api_key=${process.env.LASTFM_KEY}&format=json`;
    let { data } = await this.$axios.get(url);
    let summary = data.artist.bio.summary.split("<a ")[0];
    this.data.summary = summary;
    this.$emit("mbid", data.artist.mbid);
  },
  computed: {
    summary() {
      return this.data.summary;
    }
  }
};
</script>