<template>
  <div>
    <SplitView>
      <template #header>
        <NotFound v-if="error.has" :message="error.message" />
      </template>
      <template #content>
        <div class="page-item-container">
          <b-row>
            <b-col class="big-font">
              <FolderLink
                v-if="problemOwner.recieved"
                :name="problemOwner.data.name"
                :userId="routeUserId"
                :folderId="problemOwner.data.root"
              />
              <b-icon icon="chevron-right" scale="0.7" />
              <ProblemLink
                :profile="routeUserId"
                :problem="routeProblemId"
                :name="problem.recieved ? problem.data.name : ''"
                view="statement"
              />
            </b-col>
            <b-col class="mr-auto" cols="auto">
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
            </b-col>
          </b-row>
          <hr class="mt-1 w-100" />
          <HorCylon v-if="!(problem.recieved && problemOwner.recieved)" />
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
            :ownerName="problemOwner.data.name"
            :name="problem.data.name"
            :statement="problem.data.statement"
          />
        </div>
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
import ProblemLink from '@/components/links/ProblemLink.vue';
import SplitView from '@/components/SplitView.vue';
import ProfileCardLayout from '@/components/profile/ProfileCardLayout.vue';
import FolderLink from '@/components/links/FolderLink.vue';

export default {
  components: {
    Problem,
    SubmissionHistory,
    HorCylon,
    FolderLink,
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
      error: {
        has: false,
        message: null,
      },
      selected: this.$route.query.view,
      radio: {
        options: [
          { text: 'Statement', value: 'statement' },
          { text: 'Submissions', value: 'submissions' },
        ],
      },
      problemOwner: {
        recieved: false,
        data: null,
      },
    };
  },

  created() {
    Backend.getProblem(this.routeUserId, this.routeProblemId)
      .then((problem) => {
        this.problem = {
          recieved: true,
          data: problem,
        };
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
    Backend.getUser(this.routeUserId)
      .then((user) => {
        this.problemOwner = {
          recieved: true,
          data: user,
        };
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
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
