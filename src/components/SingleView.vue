<template>
<div>
  <b-container fluid="lg" class="mt-1">
    <slot name="header" />
    <slot name="content" />
  </b-container>
</div>
</template>
<script>
export default {
  props: {},
};
</script>
<style lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap
</style>
