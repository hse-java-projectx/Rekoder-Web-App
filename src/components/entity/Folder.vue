<template lang="">
  <div>
    <span>
      <b-icon icon="folder" class="mr-2" />
      <router-link :to="`/archive/${data.id}`"> {{ data.name }} </router-link>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
  },
};
</script>
<style lang="">
</style>
