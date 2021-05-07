<template>
  <b-img :src="src" thumbnail :alt="alt" rounded="circle" width="60" />
</template>
<script>
export default {
  props: {
    src: String,
    alt: String,
  },
};
</script>
<style lang="">
</style>
