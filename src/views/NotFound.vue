<template>
  <SingleView>
    <template #header> <h2> Page not found </h2> </template>
    <template #content> {{ message }} </template>
  </SingleView>
</template>

<script>
import SingleView from '@/components/SingleView.vue';

export default {
  name: 'NotFound',

  components: { SingleView },

  props: {
    message: String,
  },
};
</script>
