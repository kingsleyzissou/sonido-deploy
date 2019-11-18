<template>
  <fragment>
    <canvas id="canvas"></canvas>
    <div class="row">
      <div class="col-12">
        <card type="plain" class="mb-0">
          <h2 class="card-title">Search Results</h2>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="plain" class="mb-0">
          <h3 class="card-title">Artists</h3>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-4" v-for="(artist, index) in artists.items.slice(0,3)" :key="index">
        <template v-if="artist">
          <card type class="text-center">
            <div v-if="artist.images.length > 0">
              <img
                slot="card-image"
                :src="artist.images[0].url"
                class="rounded-circle"
                style="width: 150px"
                alt="Profile pic"
              />
            </div>
            <div v-else class="text-center">
              <img
                slot="card-image"
                class="rounded-circle"
                src="/img/placeholder-round.png"
                style="width: 150px"
                alt="Profile pic"
              />
            </div>
            <h6 class="card-category mt-4 mb-0">ARTIST</h6>
            <h3 class="card-title mt-0">
              <nuxt-link class="text-white" :to="`/artists/${artist.id}`">{{ artist.name }}</nuxt-link>
            </h3>
          </card>
        </template>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="plain" class="mb-0">
          <h3 class="card-title">Albums</h3>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card>
          <div class="row">
            <div class="col-2" v-for="(album, index) in albums.items.slice(0,6)" :key="index">
              <template v-if="album">
                <card type="plain" class="text-center mb-0">
                  <div v-if="album.images.length > 0">
                    <img
                      slot="card-image"
                      :src="album.images[0].url"
                      style="width: 100px"
                      alt="Profile pic"
                    />
                  </div>
                  <h6 class="card-category mt-4 mb-0">ALBUM</h6>
                  <h4 class="card-title mt-0">
                    <nuxt-link
                      class="text-white"
                      :to="`/albums/${album.id}`"
                    >{{ album.name | truncate }}</nuxt-link>
                  </h4>
                </card>
              </template>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="plain" class="mb-0">
          <h3 class="card-title">Songs</h3>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card>
          <tracklist :tracks="tracks.items" :full="true"></tracklist>
        </card>
      </div>
    </div>
  </fragment>
</template>

<script>
import Tracklist from "~/components/Tracklist";
export default {
  layout: "dashboard",
  components: { Tracklist },
  data() {
    return {
      q: this.$route.query.q
    };
  },
  async asyncData({ query, $axios }) {
    let { data } = await $axios.get("/search", {
      params: {
        q: query.q,
        type: "artist,album,track"
      }
    });
    const { artists, albums, tracks } = data;
    return data;
  },
  filters: {
    truncate(string) {
      return string.length > 20 ? string.slice(0, 20) + "..." : string;
    }
  }
};
</script>