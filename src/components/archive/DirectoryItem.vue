<template>
  <b-list-group-item class="dir-item">
    <span>
      <b-icon v-if="isDirectory" icon="folder" class="mr-2" />
      <b-icon v-else icon="file-earmark-code" class="mr-2" />
      <router-link class="hide-overflow" :to="link"> {{ name }} </router-link>
    </span>
  </b-list-group-item>
</template>

<script>
export default {
  props: {
    name: String,
    isDirectory: Boolean,
    link: String,
  },
  computed: {},
};
</script>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

@media (max-width: $grid-md)
  .dir-item
    font-size: 11pt
</style>
