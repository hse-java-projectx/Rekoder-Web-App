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
    isSigned: (state) => !(state.user === undefined || state.user === null),
    userid: (state) => {
      if (state.user === null) {
        return null;
      }
      return state.user.id;
    },
    archiveRoot: (state) => {
      if (state.user === null) {
        return null;
      }
      return state.user.root;
    },
  },
});
