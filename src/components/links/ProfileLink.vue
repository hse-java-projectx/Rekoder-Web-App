<template>
  <router-link :to="'/profile/' + profile">
    {{ profile }}
  </router-link>
</template>
<script>
export default {
  props: {
    profile: String,
  },
};
</script>
