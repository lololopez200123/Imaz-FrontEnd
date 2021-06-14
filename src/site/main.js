// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueResource from "vue-resource";
import VeeValidate from "vee-validate";
import VueLodash from "vue-lodash";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import faSolid from "@fortawesome/fontawesome-free-solid";
import faBrands from "@fortawesome/fontawesome-free-brands";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueAnalytics from "vue-analytics";
import FormPlugin from "@/site/plugins/FormsPlugin";
import GesturesPlugin from "@/site/plugins/GesturesPlugin";
import App from "@/site/App";
import router from "@/site/router";
import store from "@/site/store/index";

import * as VueGoogleMaps from 'vue2-google-maps';


import moment from "moment";

library.add(faCoffee, faSolid, faBrands);

Vue.component("font-awesome-icon", FontAwesomeIcon);


Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.use(VueLodash);
Vue.use(FormPlugin);
Vue.use(GesturesPlugin);

Vue.use(VueAnalytics, {
  id: "UA-163804987-1"
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD6C2i6P9sYyUNbPYkzo8hK1sK_1Dqp5xU',
    libraries: 'places',
    region: 'AR',
    language: 'es'
  }
});



Vue.config.productionTip = false;


/* eslint-disable no-new */
window.App = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

window.moment = moment;
