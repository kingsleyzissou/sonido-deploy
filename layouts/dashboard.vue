<template>
  <div class="wrapper">
    <side-bar backgroundColor="green">
      <template slot="links">
        <sidebar-link to="/dashboard" name="home" icon="nc-icon nc-home-52" />
        <sidebar-link to="/browse" name="browse" icon="nc-icon nc-layers-3" />
      </template>
    </side-bar>
    <div class="main-panel" data="green">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "~/components/Layout/TopNavbar.vue";
import ContentFooter from "~/components/Layout/ContentFooter.vue";
import DashboardContent from "~/components/Layout/Content.vue";
import MobileMenu from "~/components/Layout/MobileMenu";
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
