<template>
  <div>
    <b-img :src="src" :alt="alt" class="image-icon"></b-img>
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

<style lang="sass" scoped>
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.image-icon
  height: 60pt
  width: 60pt
  border-radius: 50%
  object-fit: cover

@media (min-width: $grid-sm)
  .image-icon
    height: 70pt
    width: 70pt
</style>
