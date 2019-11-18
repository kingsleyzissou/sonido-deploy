<template>
  <nav
    class="navbar navbar-expand-lg navbar-absolute"
    :class="{'bg-white': showMenu, 'navbar-transparent': !showMenu}"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline" :class="{toggled: this.$sidebar.showSidebar}">
          <button
            type="button"
            class="navbar-toggler"
            aria-label="Navbar toggle button"
            @click="toggleSidebar"
          >
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="#">{{routeName}}</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation-index"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <collapse-transition>
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav ml-auto">
            <dropdown tag="li" menu-on-right title-tag="a" class="nav-item">
              <a
                slot="title"
                href="#"
                class="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="true"
              >
                <div class="notification d-none d-lg-block d-xl-block"></div>
                <i class="tim-icons icon-sound-wave"></i>
                <p class="d-lg-none">New Notifications</p>
              </a>
              <li class="nav-link">
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#createModal"
                  @click="createModalVisible = true"
                  class="nav-item dropdown-item"
                >Create playlist</a>
              </li>
            </dropdown>
            <modal
              :show.sync="createModalVisible"
              modal-classes="modal-sm"
              id="createModal"
              :centered="false"
              :show-close="true"
            >
              <template>
                <form role="form" @submit.prevent="createPlaylist">
                  <h3 class="text-dark">Create a playlist</h3>
                  <div class="form-group">
                    <label for="usr">Playlist name</label>
                    <input type="text" v-model="newPlaylist" class="form-control" id="usr" />
                  </div>
                  <div>
                    <base-button type="primary" @click.prevent="createPlaylist" class="my-4">Create</base-button>
                  </div>
                </form>
              </template>
            </modal>
            <div class="search-bar input-group" @click="searchModalVisible = true">
              <!-- <input type="text" class="form-control" placeholder="Search...">
              <div class="input-group-addon"><i class="tim-icons icon-zoom-split"></i></div>-->
              <button
                class="btn btn-link"
                id="search-button"
                data-toggle="modal"
                data-target="#searchModal"
                v-if="$auth.loggedIn"
              >
                <i class="tim-icons icon-zoom-split"></i>
              </button>
              <!-- You can choose types of search input -->
            </div>
            <modal
              :show.sync="searchModalVisible"
              class="modal-search"
              id="searchModal"
              :centered="false"
              :show-close="true"
            >
              <input
                slot="header"
                v-model="searchQuery"
                type="text"
                class="form-control"
                id="inlineFormInputGroup"
                @keyup.enter="search"
                placeholder="SEARCH"
              />
            </modal>
            <li class="nav-item">
              <button
                @click="login"
                class="btn btn-sm btn-primary btn-simple"
                v-if="!$auth.loggedIn"
              >Log In</button>
            </li>
            <dropdown
              tag="li"
              menu-on-right
              title-tag="a"
              class="nav-item"
              menu-classes="dropdown-navbar"
              v-if="$auth.loggedIn"
            >
              <a
                slot="title"
                href="#"
                class="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="true"
              >
                <div class="photo">
                  <img :src="image" />
                </div>
                <b class="caret d-none d-lg-block d-xl-block"></b>
                <p class="d-lg-none">Log out</p>
              </a>
              <li class="nav-link">
                <a href="/profile" class="nav-item dropdown-item">Profile</a>
              </li>
              <!-- <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Settings</a>
              </li>-->
              <div class="dropdown-divider"></div>
              <li class="nav-link">
                <a href="#" @click.prevent="logout" class="nav-item dropdown-item">Log out</a>
              </li>
            </dropdown>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import Modal from "~/ui/Modal";

export default {
  components: {
    CollapseTransition,
    Modal
  },
  mounted() {
    this.$store.dispatch("playlists/getPlaylists");
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    image() {
      return this.$auth.$state.user.images.length > 0
        ? this.$auth.$state.user.images[0].url
        : "/img/placeholder-square.png";
    },
    playlists() {
      return this.$store.state.playlists.playlists;
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      createModalVisible: false,
      loginModalVisible: false,
      searchQuery: "",
      newPlaylist: ""
    };
  },
  methods: {
    createPlaylist() {
      this.$axios.post(`/users/${this.$auth.$state.user.id}/playlists`, {
        name: this.newPlaylist,
        public: true,
        collaborative: false
      });
      this.createModalVisible = false;
      this.$store.dispatch("playlists/getPlaylists");
      this.$notify({
        type: "primary",
        message: "Success: playlist created successfully",
        verticalAlign: "top",
        horizontalAlign: "right"
      });
    },
    search() {
      const url = `/search?q=${this.searchQuery}`;
      this.$router.push(url);
    },
    login() {
      this.$auth.loginWith("spotify");
    },
    logout() {
      this.$auth.logout();
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>
<style scoped>
.form-control {
  color: #2b3553;
}
.form-control:focus,
.form-control:hover {
  color: #2b3553;
}
</style>
