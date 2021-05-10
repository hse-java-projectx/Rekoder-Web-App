<template>
  <SingleView>
    <template #header> </template>
    <template #content>
      <h1>Help</h1>
      <div>
        <p>In this article we will tell you how to use the service.</p>
      </div>
      <hr />
    </template>
  </SingleView>
</template>

<script>
import SingleView from '@/components/SingleView.vue';

export default {
  name: 'About',
  components: { SingleView },
};
</script>
