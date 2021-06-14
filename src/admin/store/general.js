export default {
  namespaced: true,
  state: {
    param1: "",
    param2: ""
  },
  getters: {
    paramSum: state => (backwards = false) =>
      backwards ? state.param2 + state.param1 : state.param1 + state.param2
  },
  actions: {
    action({ commit }, { param1, param2 }) {
      commit("mutation", { param1, param2 });
    }
  },
  mutations: {
    mutation(state, { param1, param2 }) {
      state.param1 = param1;
      state.param2 = param2;
    }
  }
};
