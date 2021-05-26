<template lang="">
  <div>
    <span>
      <b-icon icon="file-earmark-code" class="mr-2" />
      <router-link :to="`/problem/${data.id}`"> {{ data.name }} </router-link>
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
