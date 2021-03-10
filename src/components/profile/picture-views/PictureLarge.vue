<template>
  <b-container>
    <b-img
      :src="src"
      :alt="alt"
      rounded
      fluid-grow
      circle
      class="image-icon"
    ></b-img>
  </b-container>
</template>

<script>
export default {
  props: {
    src: String,
    alt: String,
  },
};
</script>

<style lang="sass" scoped>
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.image-icon
  min-width: 100pt
</style>
