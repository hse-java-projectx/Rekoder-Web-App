<template>
  <div class="circular">
    <b-avatar :src="src" size="4rem" />
  </div>
</template>
<script>
export default {
  props: {
    src: String,
    alt: String,
  },
};
</script>
<style lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.circular
  width: 50pt
  height: 50pt
  position: relative
  overflow: hidden
  border-radius: 50%
  display: inline

  & img
    object-fit: cover
    border-radius: 50%
    height: 50pt
    width: 50pt
</style>
