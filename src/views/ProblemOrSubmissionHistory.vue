<template>
  <div>
    <SubNavbar>
      <template #left>
        <ProfileLink :profile="routeUserId" />: "{{ routeProblemId }}"
      </template>
      <template #right>
        <router-link :to="statementLink"> Statement </router-link>
        <router-link :to="submissionsLink"> Submissions </router-link>
      </template>
    </SubNavbar>
    <HorCylon v-if="!problem.recieved" />
    <SubmissionHistory
      v-else-if="viewingSubmissions"
      :owner="routeUserId"
      :problem="problem.data.name"
      :submissions="problem.data.submissions"
    />
    <Problem
      v-else
      :owner="routeUserId"
      :name="problem.data.name"
      :statement="problem.data.statement"
    />
  </div>
</template>
<script>
import Problem from '@/views/Problem.vue';
import SubmissionHistory from '@/views/SubmissionHistory.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import Backend from '@/js/backend/main';
import SubNavbar from '@/components/SubNavbar.vue';
import ProfileLink from '@/components/links/ProfileLink.vue';

export default {
  components: {
    Problem,
    SubmissionHistory,
    HorCylon,
    SubNavbar,
    ProfileLink,
  },

  data() {
    return {
      routeUserId: this.$route.params.userId,
      routeProblemId: this.$route.params.problemId,
      view: this.$route.query.view, // submissions, statement
      problem: {
        recieved: false,
        data: null,
      },
    };
  },

  created() {
    Backend.getProblem(this.routeUserId, this.routeProblemId).then((problem) => {
      this.problem = {
        recieved: true,
        data: problem,
      };
    });
  },

  computed: {
    viewingSubmissions() {
      return this.view === 'submissions';
    },
    viewingStatement() {
      return this.view === 'statement';
    },
    statementLink() {
      return `/profile/${this.routeUserId}/problem/${this.routeProblemId}/?view=statement`;
    },
    submissionsLink() {
      return `/profile/${this.routeUserId}/problem/${this.routeProblemId}/?view=submissions`;
    },
  },
};
</script>
<style lang="">
</style>
