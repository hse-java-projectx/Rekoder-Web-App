<template>
  <b-container fluid class="p-0 p-md-2">
    <b-container class="mt-4">
      <slot name="header" />
    </b-container>
    <div class="sw-container mt-3">
      <div class="p-2">
        <slot name="subheader" />
      </div>
      <b-container fluid class="">
        <b-row>
          <b-col cols="12" lg="4" class="px-0 pr-lg-1">
            <slot name="left" />
          </b-col>
          <b-col cols="12" lg="8" class="d-lg-inline-block px-0 pl-0">
            <slot name="right" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>
<script>
export default {
  props: {},
};
</script>
<style lang="sass">
@import bootstrap/scss/bootstrap
@import src/style/bootstrap-custom.scss

@media (min-width: $grid-xl)
  .sw-container
    margin-left: 60pt
    margin-right: 60pt

@media (min-width: $grid-xxl)
  .sw-container
    margin-left: 120pt
    margin-right: 120pt
</style>
