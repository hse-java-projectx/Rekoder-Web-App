<template>
  <b-list-group-item>
    <b-row class="text-justify">
      <b-col cols="auto">
        <b-icon v-if="isDirectory" icon="folder" />
        <b-icon v-else icon="file-earmark-code" />
      </b-col>
      <b-col cols="auto" class="overflow-hidden">
        <router-link :to="link"> {{ name }} </router-link>
      </b-col>
    </b-row>
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
</style>
