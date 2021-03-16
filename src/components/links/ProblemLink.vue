<template>
  <router-link :to="link"> {{ name }} </router-link>
</template>
<script>
export default {
  props: {
    profile: String,
    problem: String,
    name: String,
  },

  computed: {
    link() {
      return `/profile/${this.profile}/problem/${this.problem}`;
    },
  },
};
</script>
