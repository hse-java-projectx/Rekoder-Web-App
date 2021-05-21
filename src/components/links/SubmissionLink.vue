<template>
  <router-link :to="link"> #{{ id }} </router-link>
</template>
<script>
export default {
  props: {
    id: String,
  },

  computed: {
    link() {
      return `/submission/${this.id}`;
    },
  },
};
</script>
