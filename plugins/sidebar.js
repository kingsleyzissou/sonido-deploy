import Sidebar from "~/ui/Sidebar/SideBar.vue";
import SidebarLink from "~/ui/Sidebar/SidebarLink.vue";

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  displaySidebar(value) {
    this.showSidebar = value;
    let root = document.getElementsByTagName('html')[0];
    root.classList.toggle('nav-open');
  }
};

const SidebarPlugin = {
  install(Vue) {
    let app = new Vue({
      data: {
        sidebarStore: SidebarStore
      }
    });

    Vue.prototype.$sidebar = app.sidebarStore;
    Vue.component("side-bar", Sidebar);
    Vue.component("sidebar-link", SidebarLink);
  }
};

export default SidebarPlugin;