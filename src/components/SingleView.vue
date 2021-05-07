<template>
  <div>
    <b-container fluid="lg" class="mt-1">
      <div>
        <slot name="header" />
      </div>
      <div>
        <slot name="content" />
      </div>
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
