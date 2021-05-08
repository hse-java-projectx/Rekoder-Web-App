<template>
  <div>
    <span class="mr-3">
      <Icon :src="team.avatarPath" :alt="team.avatarAlt" />
    </span>
    <router-link :to="team.ref"> {{ team.name }} </router-link>
  </div>
</template>
<script>
import Icon from '@/components/avatars/Icon.vue';

export default {
  components: {
    Icon,
  },

  props: {
    team: Object,
    /*
    name: String,
    ref: String,
    avatarAlt: String,
    avatarPath: String,
    */
  },
};
</script>
<style lang="">
</style>
