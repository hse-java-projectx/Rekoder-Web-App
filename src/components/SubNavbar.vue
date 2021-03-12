<template>
  <div class="text-secondary mb-2">
    <b-row>
      <b-col class="text-left">
        <slot name="left" />
      </b-col>
      <b-col class="text-right">
        <slot name="right" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap
</style>
