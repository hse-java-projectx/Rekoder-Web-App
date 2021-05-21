<template>
  <router-link :to="link"> {{ name }} </router-link>
</template>
<script>
export default {
  props: {
    problem: String,
    name: String,
    view: String,
  },

  computed: {
    link() {
      return `/problem/${this.problem}?view=${this.view}`;
    },
  },
};
</script>
