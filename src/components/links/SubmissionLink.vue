<template>
  <div>
    <router-link :to="'/profile/' + profile + '/submissions/' + id">
      # {{ id }}
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    profile: String,
    id: String,
  },
};
</script>
