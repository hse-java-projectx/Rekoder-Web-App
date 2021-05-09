<template>
  <SingleView>
    <template #header> Something went wrong </template>
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
