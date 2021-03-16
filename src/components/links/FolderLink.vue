<template>
  <router-link :to="link"> {{ name }} </router-link>
</template>
<script>
export default {
  props: {
    userId: String,
    folderId: String,
  },

  computed: {
    link() {
      return `/profile/${this.userId}/archive/${this.folderId}`;
    },
  },
};
</script>
