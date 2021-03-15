<template>
  <div>
    <SubNavbar>
      <template #left>
        <ProfileLink :profile="routeUserId" /> /
        {{ problem.recieved ? problem.data.name : "" }}
      </template>
      <template #right>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            id="radio-type"
            v-model="selected"
            :options="radio.options"
            :aria-describedby="ariaDescribedby"
            button-variant="outline-primary"
            name="radio-btn-outline"
            size="lg"
            buttons
          ></b-form-radio-group>
        </b-form-group>
      </template>
    </SubNavbar>
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
