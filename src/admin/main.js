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
import CKEditor from "@ckeditor/ckeditor5-vue";
import FormPlugin from "@/admin/plugins/FormsPlugin";
import App from "@/admin/App";
import router from "@/admin/router";
import store from "@/admin/store/index";

library.add(faCoffee, faSolid, faBrands);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(CKEditor);

Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.use(VueLodash);
Vue.use(FormPlugin);

Vue.filter("capitalize", str => (str ? str[0].toUpperCase() + str.substr(1, str.length) : ""));

Vue.config.productionTip = false;

/* eslint-disable no-new */
window.App = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
