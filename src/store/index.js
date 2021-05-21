import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    profileType: null,
    id: null,
  },
  mutations: {
    signin(state, info) {
      state.user = info.data;
      state.profileType = info.profileType;
      state.id = info.id;
    },
    signout(state) {
      state.user = null;
      state.profileType = null;
      state.id = null;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isSigned: (state) => !(state.user === undefined || state.user === null),
    userid: (state) => state.id,
    archiveRoot: (state) => {
      if (state.user === null) {
        return null;
      }
      return state.user.rootFolderId;
    },
    storeProfileType: (state) => state.profileType,
  },
});
