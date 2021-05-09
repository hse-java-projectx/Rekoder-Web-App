<template>
  <router-link :to="'/profile/' + profile">
    {{ name }}
  </router-link>
</template>
<script>
export default {
  props: {
    name: String,
    profile: String,
  },
};
</script>
