<template>
  <fragment>
    <template v-if="album && !loading">
      <card type="plain" class="mb-0">
        <h3 class="mb-0">New Releases</h3>
      </card>
      <card type="plain" class="mb-0" v-if="album.images.length > 0">
        <nuxt-link class="text-white" :to="`/albums/${album.id}`">
          <div v-if="album.images.length > 0" style="width: 150px">
            <img
              slot="card-image"
              :src="album.images[0].url"
              style="width: 150px"
              alt="Profile pic"
            />
          </div>
          <div style="width: 150px">
            <h4 class="card-title mt-0">{{ album.name }}</h4>
          </div>
        </nuxt-link>
      </card>
    </template>
  </fragment>
</template>

<script>
import moment, { duration } from "moment";

export default {
  props: ["artist"],
  data() {
    return {
      loading: true,
      data: {
        album: {}
      }
    };
  },
  async mounted() {
    const { data } = await this.$axios.get(`/artists/${this.artist}/albums`);
    let now = new moment();
    let newAlbums = data.items.filter(album => {
      let release = moment(album.release_date, "YYYY-MM-DD");
      return moment.duration(now.diff(release)).years() < 1;
    });
    let latest = newAlbums.reduce((newest, album) => {
      let c = moment.duration(now.diff(album.release_date));
      let n = moment.duration(now.diff(newest.release_date));
      return n > c ? album : newest;
    }, newAlbums[0]);
    this.data.album = latest;
    this.loading = false;
  },
  computed: {
    album() {
      return this.data.album;
    }
  }
};
</script>