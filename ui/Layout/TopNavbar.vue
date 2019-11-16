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
                  <img :src="$auth.$state.user.images[0].url" />
                </div>
                <b class="caret d-none d-lg-block d-xl-block"></b>
                <p class="d-lg-none">Log out</p>
              </a>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Profile</a>
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Settings</a>
              </li>
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
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      loginModalVisible: false,
      searchQuery: ""
    };
  },
  methods: {
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
<style>
</style>
