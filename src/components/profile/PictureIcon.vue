<template>
  <b-container class="image-wrapper px-0">
    <b-img
      :src="src"
      :alt="alt"
      fluid-grow
      thumbnail
    ></b-img>
  </b-container>
</template>

<script>
export default {
  props: {
    src: String,
    alt: String,
    size: String,
  },
};
</script>

<style lang="sass" scoped>
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap
</style>
