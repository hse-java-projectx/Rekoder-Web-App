<template>
  <router-link :to="link"> #{{ id }} </router-link>
</template>
<script>
export default {
  props: {
    profile: String,
    problem: String,
    id: String,
  },

  computed: {
    link() {
      return `/profile/${this.profile}/problem/${this.problem}/submission/${this.id}`;
    },
  },
};
</script>
