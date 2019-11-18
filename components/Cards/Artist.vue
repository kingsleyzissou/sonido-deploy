<template>
  <div class="row" v-show="!loading">
    <div class="col-12">
      <div class="card">
        <div
          class="card-image gradient-overlay"
          :style="{
              backgroundSize: 'auto 400px',
              backgroundPosition: 'top right',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `linear-gradient(to right, ${hex} 55%, rgba(0,0,0,0)), url(${image})`,
            }"
        ></div>
        <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
          <h1 class="card-title">{{artist.name}}</h1>
          <h6
            v-cloak
            class="card-subtitle mb-2 text-muted"
          >{{artist.followers.total | humanReadable}} followers</h6>
          <div class="mt-2 mb-2">
            <base-button round type="primary" @click="follow" v-if="!following">Follow</base-button>
            <base-button round simple type="primary" @click="unfollow" v-else>Unfollow</base-button>
            <base-button round simple type="success" @click="play">Play</base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbro from "numbro";

export default {
  props: ["artist"],
  data() {
    return {
      loading: true,
      data: {
        following: false,
        hex: "",
        image: ""
      }
    };
  },
  async mounted() {
    let image =
      this.artist.images.length > 0
        ? this.artist.images[0].url
        : "http://localhost:3000/img/placeholder-square.png";
    const [following, hex] = await Promise.all([
      this.$axios.get(
        `/me/following/contains?type=artist&ids=${this.artist.id}`
      ),
      this.$axios.get("http://localhost:3000/api/image", {
        params: {
          image: image
        }
      })
    ]);
    this.loading = false;
    this.data = { following: following.data[0], hex: hex.data, image };
  },
  methods: {
    play() {
      this.$play(this.artist, this.$store, this.$axios);
    },
    async follow() {
      await this.$axios.put("/me/following?type=artist", {
        ids: [this.artist.id]
      });
      this.data.following = true;
      this.notify(
        "primary",
        `Success! You are now following ${this.artist.name}`
      );
    },
    async unfollow() {
      await this.$axios.delete("/me/following?type=artist", {
        data: { ids: [this.artist.id] }
      });
      this.data.following = false;
      this.notify("danger", `Success! You have unfollowed ${this.artist.name}`);
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
    },
    hex() {
      return this.data.hex;
    },
    image() {
      return this.data.image;
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

<style>
.gradient-overlay {
  height: 300px;
}
</style>