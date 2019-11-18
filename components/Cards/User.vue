<template>
  <div class="row" v-show="!loading">
    <div class="col-12">
      <card>
        <div class="d-flex align-items-end">
          <div class="mr-4" style="width: 250px; height: 100%">
            <img :src="image" alt="Profile picture" style="width:100%" />
          </div>
          <div class="mr-2">
            <h6 class="mb-0">User</h6>
            <h1 class="card-title">{{user.display_name}}</h1>
            <h6
              v-cloak
              class="card-subtitle mb-2 text-muted"
            >{{user.followers.total | humanReadable}} followers</h6>
            <div class="mt-2 mb-2" v-if="user.id != $auth.$state.user.id">
              <base-button round type="primary" @click="follow" v-if="!following">Follow</base-button>
              <base-button round simple type="success" @click="unfollow" v-else>Unfollow</base-button>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import numbro from "numbro";

export default {
  props: ["user"],
  data() {
    return {
      loading: true,
      data: {
        following: false,
        hex: ""
      }
    };
  },
  async mounted() {
    const [following, hex] = await Promise.all([
      this.$axios.get(`/me/following/contains?type=user&ids=${this.user.id}`)
    ]);
    this.loading = false;
    this.data = { following: following.data[0] };
  },
  methods: {
    async follow() {
      await this.$axios.put("/me/following?type=user", {
        ids: [this.user.id]
      });
      this.data.following = true;
      this.notify(
        "primary",
        `Success! You are now following ${this.user.name}`
      );
    },
    async unfollow() {
      await this.$axios.delete("/me/following?type=user", {
        data: { ids: [this.user.id] }
      });
      this.data.following = false;
      this.notify("danger", `Success! You have unfollowed ${this.user.name}`);
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
    image() {
      return this.user.images.length > 0
        ? this.user.images[0].url
        : "/img/placeholder-square.png";
    },
    following() {
      return this.data.following;
    },
    hex() {
      return this.data.hex;
    }
    // image() {
    //   return this.data.image;
    // }
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