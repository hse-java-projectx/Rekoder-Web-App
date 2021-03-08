<template>
  <router-link :to="link">
    <b-nav-text class="navbar-link-text text-light">
      {{ name }}
      <b-icon :icon="icon" class="d-none d-lg-inline"></b-icon>
    </b-nav-text>
  </router-link>
</template>

<script>
export default {
  props: {
    link: String,
    icon: String,
    name: String,
  },
};
</script>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.navbar-link-text
  color: $light
  &:hover
    text-decoration-line: underline
</style>
