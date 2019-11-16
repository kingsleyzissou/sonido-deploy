<template>
  <div class="wrapper">
    <side-bar backgroundColor="green">
      <template slot="links">
        <sidebar-link to="/dashboard" name="home" icon="nc-icon nc-home-52" />
        <sidebar-link to="/browse" name="browse" icon="nc-icon nc-layers-3" />
        <sidebar-link to="/recent" name="recent" icon="tim-icons icon-refresh-02" />
        <sidebar-link to="/recent" name="liked" icon="tim-icons icon-heart-2" />
        <sidebar-link to="/recent" name="albums" icon="tim-icons icon-components" />
        <sidebar-link to="/recent" name="artists" icon="tim-icons icon-palette" />
        <sidebar-link to="/recent" name="playlists" icon="tim-icons icon-single-copy-04" />
      </template>
    </side-bar>
    <div class="main-panel" data="green">
      <notifications></notifications>
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "~/ui/Layout/TopNavbar.vue";
import ContentFooter from "~/ui/Layout/ContentFooter.vue";
import DashboardContent from "~/ui/Layout/Content.vue";
import MobileMenu from "~/ui/Layout/MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
