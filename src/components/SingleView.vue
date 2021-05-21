<template>
  <div>
    <b-container fluid="lg" class="mt-1 mt-md-4">
      <div>
        <b-container fluid class="my-2">
          <b-container fluid class="mt-4">
            <span class="big-font">
              <slot name="top" />
            </span>
          </b-container>
          <b-container class="mt-4">
            <span class="big-font">
              <slot name="header" />
            </span>
          </b-container>
        </b-container>
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
