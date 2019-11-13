import Vue from 'vue';

import SideBar from "./sidebar";
import Notify from "./notification";
import GlobalComponents from "./components";
import GlobalDirectives from "./directives";

//css assets
import "~/assets/scss/black-dashboard.scss";
import "~/assets/css/nucleo-icons.css";
import "~/assets/css/nucleo-demo.css";
import "~/assets/demo/demo.css";


Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(SideBar);
Vue.use(Notify);


