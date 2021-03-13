<template>
  <div class="text-secondary mb-2" style="font-size: 24pt">
    <b-row>
      <b-col class="text-left">
        <slot name="left" />
      </b-col>
      <b-col class="text-right" cols="auto">
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
