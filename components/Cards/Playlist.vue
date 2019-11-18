<template>
  <fragment>
    <div class="row">
      <div class="col-12">
        <div class="card p-2">
          <div class="card-body">
            <div class="d-flex align-items-end">
              <div class="mr-4" style="width: 275px; height: 100%">
                <img :src="playlist.images[0].url" alt="Album cover" />
              </div>
              <div class="mr-2">
                <h6 class="mb-0">Playlist</h6>
                <h2 class="album-title">{{playlist.name}}</h2>
                <p class="card-text">{{playlist.description}}</p>
                <span>by</span>
                <h6 class="muted">
                  <nuxt-link :to="`/profile/${playlist.owner.id}`">{{ playlist.owner.display_name }}</nuxt-link>
                </h6>
                <ul class="list-inline mb-2">
                  <li class="list-inline-item">{{ playlist.tracks.items.length | pluralise }}</li>
                </ul>
                <div class="mt-2 mb-2">
                  <base-button round type="primary" @click="follow" v-if="!following">Follow</base-button>
                  <base-button round simple type="primary" @click="unfollow" v-else>Unfollow</base-button>
                  <base-button round simple type="success" @click="play">Play</base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import moment, { duration } from "moment";

const createArtistLink = artist => {
  return `<a href="/artists/${artist.id}">${artist.name}</a>`;
};

export default {
  props: ["playlist"],
  data() {
    return {
      data: {
        following: false
      }
    };
  },
  async mounted() {
    const { data } = await this.$axios.get(
      `/playlists/${this.playlist.id}/followers/contains`,
      {
        params: {
          ids: this.$auth.$state.user.id
        }
      }
    );
    this.loading = false;
    this.data = { following: data[0] };
  },
  methods: {
    play() {
      this.$play(this.playlist, this.$store, this.$axios);
    },
    async follow() {
      await this.$axios.put(`/playlists/${this.playlist.id}/followers`);
      this.data.following = true;
      this.notify(
        "primary",
        `Success! You are now following ${this.playlist.name}`
      );
    },
    async unfollow() {
      await this.$axios.delete(`/playlists/${this.playlist.id}/followers`);
      this.data.following = false;
      this.notify(
        "danger",
        `Success! You have unfollowed ${this.playlist.name}`
      );
    },
    notify(type, message) {
      this.$notify({
        type,
        message,
        verticalAlign: "top",
        horizontalAlign: "right"
      });
    }
  },
  computed: {
    following() {
      return this.data.following;
    }
  },
  filters: {
    pluralise(total) {
      if (total == 1) return "1 song";
      return `${total} songs`;
    },
    getYear(date) {
      let d = moment(date, "YYYY-MM-DD");
      return d.year();
    },
    stringify(artists) {
      const keys = artists.length;
      if (keys === 1) return createArtistLink(artists[0]);
      return artists.map(a => createArtistLink(a)).join(", ");
    }
  }
};
</script>

<style scoped>
.album-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 0;
}
</style>