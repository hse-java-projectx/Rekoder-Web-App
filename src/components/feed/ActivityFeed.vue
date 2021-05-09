<template>
  <div>
    <div v-if="emptyActivity">
      <span class="big-font"> No recent activity </span>
    </div>
    <div v-for="activity in activities" :key="activity.subject.name">
      <Activity
        :anon="anon"
        :type="activity.type"
        :object="activity.object"
        :action="activity.action"
        :subject="activity.subject"
      />
    </div>
  </div>
</template>
<script>
import Activity from '@/components/feed/Activity.vue';

export default {
  props: {
    activities: Array[Object],
    anon: Boolean,
  },

  components: {
    Activity,
  },

  computed: {
    emptyActivity() {
      return this.activities.length === 0;
    },
  },
};
</script>

<style lang="sass" scoped>
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap
</style>
