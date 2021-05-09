<template>
  <b-list-group-item class="d-flex justify-content-between dir-item">
    <div>
      <span class="mr-2">
        <b-icon v-if="isDirectory" icon="folder"></b-icon>
        <b-icon v-else-if="solved" icon="check-circle" class="solved"></b-icon>
        <b-icon v-else icon="x-circle" class="attempted"></b-icon>
      </span>
      <router-link :to="link"> {{ name }} </router-link>
    </div>
    <!-- <b-icon icon="gear" class="text-secondary" /> -->
  </b-list-group-item>
</template>

<script>
export default {
  props: {
    name: String,
    isDirectory: Boolean,
    link: String,
    solved: Boolean,
  },
  computed: {},
};
</script>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.solved
  color: $green

.attempted
  color: $red

@media (max-width: $grid-md)
  .dir-item
    font-size: 11pt
</style>
