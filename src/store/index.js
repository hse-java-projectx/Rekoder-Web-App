import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    profileType: null,
    id: null,
    search: {
      entities: [],
      locations: [],
    },
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
    addSearchEntity(state, params) {
      console.log('add search entity', params.entity);
      state.search.entities.push(params.entity);
    },
    removeSearchEntity(state, params) {
      console.log('remove search entity', params.entity);
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
      console.log('add search location', params.location);
      state.search.locations.push(params.location);
    },
    removeSearchLocation(state, params) {
      console.log('remove search location', params.location);
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
    isSigned: (state) => !(state.user === undefined || state.user === null),
    userid: (state) => state.id,
    archiveRoot: (state) => {
      if (state.user === null) {
        return null;
      }
      return state.user.rootFolderId;
    },
    storeProfileType: (state) => state.profileType,
    searchEntities: (state) => state.search.entities,
    searchLocations: (state) => state.search.locations,
  },
});
