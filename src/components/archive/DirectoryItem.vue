<template>
  <b-list-group-item class="d-flex justify-content-between dir-item">
    <div>
      <span class="mr-2">
        <b-icon v-if="isDirectory" icon="folder"></b-icon>
        <b-icon v-else icon="file-earmark-code"></b-icon>
      </span>
      <router-link :to="link"> {{ name }} </router-link>
    </div>
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
