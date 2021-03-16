<template>
  <div>
    <SplitView>
      <template #header>
        <SubNavbar>
          <template #left>
            <ProfileLink :profile="routeUserId" />
            <b-icon icon="chevron-right" scale="0.7" />
            <ProblemLink
              :profile="routeUserId"
              :problem="routeProblemId"
              :name="problem.recieved ? problem.data.name : ''"
              view="statement"
            />
          </template>
          <template #right> </template>
        </SubNavbar>
      </template>
      <template #content>
        <div class="page-item-container">
          <b-form-group v-slot="{ ariaDescribedby }" class="m-0">
            <b-form-radio-group
              id="radio-type"
              v-model="selected"
              :options="radio.options"
              :aria-describedby="ariaDescribedby"
              button-variant="outline-primary"
              name="radio-btn-outline"
              size="sm"
              buttons
            ></b-form-radio-group>
          </b-form-group>
        </div>
        <HorCylon v-if="!problem.recieved" />
        <SubmissionHistory
          v-else-if="viewingSubmissions"
          :owner="routeUserId"
          :problem="problem.data.name"
          :problemId="routeProblemId"
          :submissions="problem.data.submissions"
        />
        <Problem
          v-else
          :owner="routeUserId"
          :name="problem.data.name"
          :statement="problem.data.statement"
        />
      </template>
      <template #additional>
        <ProfileCardLayout :userId="routeUserId" />
      </template>
    </SplitView>
  </div>
</template>
<script>
import Problem from '@/views/Problem.vue';
import SubmissionHistory from '@/views/SubmissionHistory.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import Backend from '@/js/backend/main';
import SubNavbar from '@/components/SubNavbar.vue';
import ProfileLink from '@/components/links/ProfileLink.vue';
import ProblemLink from '@/components/links/ProblemLink.vue';
import SplitView from '@/components/SplitView.vue';
import ProfileCardLayout from '@/components/profile/ProfileCardLayout.vue';

export default {
  components: {
    Problem,
    SubmissionHistory,
    HorCylon,
    SubNavbar,
    ProfileLink,
    SplitView,
    ProfileCardLayout,
    ProblemLink,
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
      selected: this.$route.query.view,
      radio: {
        options: [
          { text: 'Statement', value: 'statement' },
          { text: 'Submissions', value: 'submissions' },
        ],
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

  methods: {
    onClickStatement() {
      this.$router.push(this.statementLink);
    },

    onClickSubmissions() {
      this.$router.push(this.submissionsLink);
    },
  },

  watch: {
    selected(newValue) {
      if (newValue === 'statement') {
        this.onClickStatement();
      } else {
        this.onClickSubmissions();
      }
    },
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
<style lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.select-active
  &:hover

.select-nonactive
</style>
