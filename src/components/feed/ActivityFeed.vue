<template>
  <div>
    <NothingToShow v-if="emptyActivity" message="No recent activity" />
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
import NothingToShow from '@/components/NothingToShow.vue';

export default {
  props: {
    activities: Array[Object],
    anon: Boolean,
  },

  components: {
    Activity,
    NothingToShow,
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
