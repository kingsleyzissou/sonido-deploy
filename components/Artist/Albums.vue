<template>
  <card>
    <h3 class="mb-0">Albums</h3>
    <fragment v-for="(album, index) in albums" :key="index">
      <template v-if="index < 5">
        <div class="d-flex align-items-end">
          <div class="mr-4" style="width: 150px; height: 100%">
            <img :src="album.images[0].url" alt="Album cover" />
          </div>
          <div class="mr-2">
            <h6 class="mb-0">{{ album.release_date | getYear }}</h6>
            <h3 class="album-title">{{album.name}}</h3>
          </div>
        </div>
        <wrapper :album="album.id" />
      </template>
    </fragment>
  </card>
</template>

<script>
import moment from "moment";
import Wrapper from "~/components/Tracklist/AlbumWrapper";

export default {
  props: ["artist"],
  components: {
    Wrapper
  },
  data() {
    return {
      data: {
        albums: []
      }
    };
  },
  async mounted() {
    let { data } = await this.$axios.get(`/artists/${this.artist}/albums`, {
      params: {
        include_groups: this.type,
        country: "from_token"
      }
    });
    this.data.albums = data.items;
  },
  computed: {
    albums() {
      return this.data.albums;
    }
  },
  filters: {
    getYear(date) {
      let d = moment(date, "YYYY-MM-DD");
      return d.year();
    }
  }
};
</script>