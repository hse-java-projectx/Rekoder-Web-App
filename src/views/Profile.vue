<template>
  <div>
    <h1>This is Profile Page of {{ user.name }}</h1>
  </div>
</template>

<script>
import api from '../js/api';
import state from '../router/index';

export default {
  name: 'Profile',
  props: {
    userIdentifier: String,
  },
  data() {
    return {
      user: null,
    };
  },
  components: {},
  beforeMount() {
    console.log(state.state);
    this.user = api.api.getUser(this.userIdentifier);
  },
};
</script>
