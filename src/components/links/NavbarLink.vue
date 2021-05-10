<template>
  <router-link :to="link">
    <b-nav-text class="navbar-link-text text-primary">
      {{ name }}
    </b-nav-text>
  </router-link>
</template>

<script>
export default {
  props: {
    link: String,
    name: String,
  },
};
</script>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.navbar-link-text
  color: $primary
  &:hover
    text-decoration-line: underline
</style>
