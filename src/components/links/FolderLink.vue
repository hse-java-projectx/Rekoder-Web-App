<template>
  <router-link :to="link"> {{ name }} </router-link>
</template>
<script>
export default {
  props: {
    name: String,
    folderId: String,
  },

  computed: {
    link() {
      return `/archive/${this.folderId}`;
    },
  },
};
</script>
