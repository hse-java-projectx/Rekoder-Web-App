import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.component('v-icon', Icon);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Icon);

new Vue({
  components: {
    'v-icon': Icon,
  },
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
