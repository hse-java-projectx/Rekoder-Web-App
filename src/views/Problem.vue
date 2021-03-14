<template>
  <div>
    <div class="page-item-container">
      <div class="problem-name text-center mt-3">
        {{ problem.name }}
      </div>
      <div class="text-center mb-3">
        by <ProfileLink :profile="routeOwner" />
      </div>
      <hr />
      <b> Statement </b>
      <div class="statement">
        {{ problem.statement }}
      </div>
    </div>
  </div>
</template>
<script>
import ProfileLink from '@/components/links/ProfileLink.vue';
import Backend from '@/js/backend/main';

export default {
  components: { ProfileLink },
  data() {
    return {
      routeOwner: this.$route.params.userId,
      routeProblemId: this.$route.params.problemId,
      problem: { name: '', statement: '', submissions: [] },
    };
  },

  mounted() {
    this.problem = Backend.getProblem(this.routeOwner, this.routeProblemId);
  },
};
</script>
<style lang="sass">
@import "src/style/bootstrap-custom.scss"

.problem-name
  font-size: 20pt

.statement
  font-size: 16pt
</style>
