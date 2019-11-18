<template>
  <fragment>
    <div class="wrapper">
      <side-bar backgroundColor="green">
        <template slot="links">
          <sidebar-link to="/dashboard" name="home" icon="nc-icon nc-home-52" />
          <sidebar-link to="/browse" name="browse" icon="nc-icon nc-layers-3" />
          <sidebar-link to="/recent" name="recent" icon="tim-icons icon-refresh-02" />
          <sidebar-link to="/recent" name="playlists" icon="tim-icons icon-single-copy-04" />
        </template>
      </side-bar>
      <div class="main-panel" data="green">
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
import TopNavbar from "~/ui/Layout/TopNavbar.vue";
import ContentFooter from "~/ui/Layout/ContentFooter.vue";
import DashboardContent from "~/ui/Layout/Content.vue";
import MobileMenu from "~/ui/Layout/MobileMenu";
import Transport from "~/components/Transport";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
    Transport
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

<style>
.sticky {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  background: #1e1e2f;
  width: 100%;
}
</style>
