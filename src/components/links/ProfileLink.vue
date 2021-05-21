<template>
  <router-link :to="`/profile/user/${id}`">
    {{ id }}
  </router-link>
</template>
<script>
export default {
  props: {
    id: String,
  },
};
</script>
