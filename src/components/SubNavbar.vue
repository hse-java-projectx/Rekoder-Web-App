<template>
  <div class="sub-navbar p-2">
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

.sub-navbar
  font-size: 15pt

@media (max-width: $grid-md)
  .sub-navbar
    font-size: 12pt
</style>
