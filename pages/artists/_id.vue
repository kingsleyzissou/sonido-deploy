<template>
  <fragment>
    <div class="row">
      <div class="col-5">
        <card>
          <img slot="image" class="card-img-top" :src="images[0].url" alt />
          <h2 class="card-title">{{name}}</h2>
          <h6 class="card-subtitle mb-2 text-muted">{{followers.total | humanReadable}} followers</h6>
          <!-- <p
            class="card-text"
          >With supporting text below as a natural lead-in to additional content.</p>-->
          <div class="text-center mt-4 mb-2">
            <base-button round type="primary" @click="follow" v-if="!following">Follow</base-button>
            <base-button round simple type="success" @click="unfollow" v-else>Unfollow</base-button>
          </div>
        </card>
      </div>
    </div>
    <!-- <songlist :songs="tracks.items"></songlist> -->
  </fragment>
</template>

<script>
import numbro from "numbro";
import Songlist from "~/components/Songlist";
export default {
  layout: "dashboard",
  components: {
    Songlist
  },
  async asyncData({ $axios, params }) {
    const [artist, following] = await Promise.all([
      $axios.get(`/artists/${params.id}`),
      $axios.get(
        `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${params.id}`
      )
    ]);
    return {
      ...artist.data,
      following: following.data[0]
    };
  },
  methods: {
    async follow() {
      await this.$axios.put("/me/following?type=artist", {
        ids: [this.$route.params.id]
      });
      this.following = true;
      this.notify("primary", `Success! You are now following ${this.name}`);
    },
    async unfollow() {
      await this.$axios.delete("/me/following?type=artist", {
        data: { ids: [this.$route.params.id] }
      });
      this.following = false;
      this.notify("danger", `Success! You have unfollowed ${this.name}`);
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
  filters: {
    humanReadable(number) {
      return numbro(number).format({
        thousandSeparated: true,
        average: true
      });
    }
  }
};
</script>