import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies/vue-cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    accessToken: null,
    search: {
      entities: [],
      locations: [],
    },
  },
  mutations: {
    signin(state, args) {
      VueCookies.set('rekoder-access-token', args.accessToken);
      state.user = args.user;
      state.accessToken = args.accessToken;
    },
    signout(state) {
      VueCookies.remove('rekoder-access-token');
      state.user = null;
      state.accessToken = null;
    },
    addSearchEntity(state, params) {
      state.search.entities.push(params.entity);
    },
    removeSearchEntity(state, params) {
      let removed = false;
      state.search.entities = state.search.entities.filter((e) => {
        if (!removed && params.entity === e) {
          removed = true;
          return false;
        }
        return true;
      });
    },
    addSearchLocation(state, params) {
      state.search.locations.push(params.location);
    },
    removeSearchLocation(state, params) {
      let removed = false;
      state.search.locations = state.search.locations.filter((l) => {
        if (!removed && (l.entity === params.location.entity && l.id === params.location.id)) {
          removed = true;
          return false;
        }
        return true;
      });
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    storageIsSigned: (state) => !(state.user === undefined || state.user === null),
    storageUser: (state) => state.user,
    storageUserId: (state) => (state.user ? state.user.id : null),
    storageAccessToken: (state) => state.accessToken,
    searchEntities: (state) => state.search.entities,
    searchLocations: (state) => state.search.locations,
  },
});
