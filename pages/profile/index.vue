<template>
  <fragment>
    <user-card :user="$auth.$state.user"></user-card>
    <card type="plain" class="mb-0">
      <h3 class="card-title mb-0">Top tracks</h3>
    </card>
    <tracklist :tracks="$store.state.top.tracks" :full="true" />
    <recently-played />
  </fragment>
</template>

<script>
import UserCard from "~/components/Cards/User";
import RecentlyPlayed from "~/components/Recent";
// import TopTracks from "~/components/TopTracks";
import Tracklist from "~/components/Tracklist";

export default {
  components: {
    UserCard,
    RecentlyPlayed,
    // TopTracks,
    Tracklist
  },
  data() {
    return {
      user: this.$auth.$state.user
    };
  }
};
</script>