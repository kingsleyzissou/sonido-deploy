<template>
  <fragment>
    <div class="wrapper">
      <side-bar backgroundColor="green">
        <template slot="links">
          <sidebar-link to="/dashboard" name="home" icon="nc-icon nc-home-52" />
          <sidebar-link to="/profile" name="profile" icon="tim-icons icon-single-02" />
          <sidebar-link to="/playlists" name="playlists" icon="nc-icon nc-layers-3" />
        </template>
      </side-bar>
      <div class="main-panel" data="green" refs="dashboard">
        <modal
          :show.sync="addToPlaylistModal"
          modal-classes="modal-sm"
          id="createModal"
          :centered="false"
          :show-close="true"
        >
          <template>
            <div class="form-group">
              <label for="sel1">Select a playlist:</label>
              <select class="form-control" id="sel1" v-model="selected">
                <option
                  v-for="(playlist, index) in playlists"
                  :key="index"
                  :value="playlist.id"
                  :selected="selected"
                >{{playlist.name}}</option>
              </select>
            </div>
            <!-- <form role="form" @submit.prevent="addToPlaylist"> -->
            <!-- <h3 class="text-dark">Add to playlist</h3> -->
            <!-- <div class="form-group"> -->
            <!-- <label for="usr">Playlist name</label> -->
            <!-- <input type="text" v-model="newPlaylist" class="form-control" id="usr" /> -->
            <!-- </div> -->
            Track:
            {{ track.name }}
            <div>
              <base-button type="primary" @click.prevent="addToPlaylist" class="my-4">Add</base-button>
            </div>
            <!-- </form> -->
          </template>
        </modal>
        <notifications></notifications>
        <top-navbar></top-navbar>

        <dashboard-content @click.native="toggleSidebar"></dashboard-content>

        <!-- <content-footer></content-footer> -->
      </div>
    </div>
    <footer class="sticky page-footer mt-auto font-small blue py-4">
      <div class="container text-center text-md-left">
        <transport />
      </div>
    </footer>
  </fragment>
</template>
<style lang="scss">
</style>
<script>
import Modal from "~/ui/Modal.vue";
import TopNavbar from "~/ui/Layout/TopNavbar.vue";
import ContentFooter from "~/ui/Layout/ContentFooter.vue";
import DashboardContent from "~/ui/Layout/Content.vue";
import MobileMenu from "~/ui/Layout/MobileMenu";
import Transport from "~/components/Transport";
export default {
  components: {
    Modal,
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
    Transport
  },
  data() {
    return {
      addToPlaylistModal: false,
      selected: "",
      track: {
        id: "",
        name: ""
      }
    };
  },
  mounted() {
    this.$bus.$on("add-to-playlist", event => {
      this.addToPlaylistModal = true;
      this.track = event;
    });
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    playlist() {
      let playlists = this.$store.state.playlists.playlists;
      return playlists.filter(playlist => playlist.id === this.selected)[0];
    },
    addToPlaylist() {
      this.$axios.post(`playlists/${this.selected}/tracks`, {
        uris: [this.track.uri]
      });
      this.addToPlaylistModal = false;
      let playlist = this.playlist();
      this.$notify({
        type: "primary",
        message: `Success: ${this.track.name} added to ${playlist.name}`,
        verticalAlign: "top",
        horizontalAlign: "right"
      });
    }
  },
  computed: {
    playlists() {
      return this.$store.state.playlists.playlists;
    }
  }
};
</script>

<style>
.sticky {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  background: #1e1e2f;
  width: 100%;
}
.form-control {
  color: #2b3553 !important;
}
.form-control:focus,
.form-control:hover {
  color: #2b3553;
}
</style>
