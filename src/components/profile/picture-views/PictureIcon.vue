<template>
  <b-container class="image-wrapper px-0">
    <b-img
      :src="src"
      :alt="alt"
      fluid-grow
      class="image-icon px-0"
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
  object-fit: cover
  min-width: 100pt

.image-wrapper
  padding-bottom: 100%
  padding-left: 100%
  position: relative
  left: -50%

  & img
    position: absolute
    width: auto
    min-width: 100%
    min-height: 100%
    border-radius: 50%
    border-style: double
    border-color: $gray-300
</style>
