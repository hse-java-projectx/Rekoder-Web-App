<template lang="">
  <span>
    <router-link :to="`/submission/${data.id}`" class="mr-2"> # {{ data.id }} </router-link>
  </span>
</template>
<script>
export default {
  props: {
    data: Object,
  },
};
</script>
<style lang="">
</style>
