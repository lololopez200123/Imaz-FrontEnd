import Vue from "vue";
import Vuex from "vuex";

import general from "./general";
import users from "./users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    general,
    users
  }
});
