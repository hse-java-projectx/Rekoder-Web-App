<template>
  <div>
    <SingleView>
      <template #content>
        <ArchiveComponent showPath />
      </template>
    </SingleView>
  </div>
</template>

<script>
import SingleView from '@/components/SingleView.vue';
import ArchiveComponent from '@/components/ArchiveComponent.vue';

export default {
  name: 'Archive',

  components: {
    SingleView,
    ArchiveComponent,
  },
};
</script>

<style lang="sass" scoped>
@import "@/style/bootstrap-custom.scss"
@import "@/../node_modules/bootstrap/scss/bootstrap.scss"
</style>
