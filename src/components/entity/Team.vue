<template lang="">
  <span>
    <IconSmall :src="data.avatarPath" :alt="`${data.name}'s avatar`" class="mr-2" />
    <router-link :to="`/profile/team/${data.id}`"> {{ data.name }} </router-link>
  </span>
</template>
<script>
import IconSmall from '@/components/avatars/Icon.vue';

export default {
  components: { IconSmall },

  props: {
    data: Object,
  },
};
</script>
<style lang="">
</style>
