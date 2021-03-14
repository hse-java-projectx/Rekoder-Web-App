import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    signin(state, user) {
      state.user = user;
    },
    signout() {
      this.state.user = null;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isSigned: (state) => !(typeof state.user === 'undefined' || state.user === null),
    userid: (state) => state.user.id,
    archiveRoot: (state) => state.user.root,
  },
});
