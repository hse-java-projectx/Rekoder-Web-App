<template>
  <div>
    <SearchLocationRegister entity="problem" :id="routeProblemId" />
    <SearchEntityRegister entity="submission" />
    <SingleView>
      <template #header>
        <NotFound v-if="error.has" :message="error.message" />
      </template>
      <template #subheader>
        <div class="big-font">
          <ProblemLink
            :problem="routeProblemId"
            :name="problem.recieved ? problem.data.name : ''"
            view="statement"
          />
        </div>
      </template>
      <template #content>
        <div class="page-item-container">
          <b-button-toolbar justify>
            <b-button-group>
              <b-button
                :variant="viewingStatement ? 'primary' : 'outline-primary'"
                size="sm"
                @click.prevent="onClickStatement"
              >
                Statement
              </b-button>
              <b-button
                @click.prevent="onClickSubmissions"
                :variant="viewingSubmissions ? 'primary' : 'outline-primary'"
                size="sm"
              >
                Submissions
              </b-button>
              <b-button
                v-if="problem.recieved && problem.data.problemUrl !== null"
                :href="problem.data.problemUrl"
                variant="outline-primary"
                size="sm"
              >
                Go to source
              </b-button>
              <b-button
                v-if="canSolve"
                @click.prevent="onClickSolve"
                variant="outline-primary"
                size="sm"
              >
                Solve
              </b-button>
              <b-button
                v-else-if="canClone"
                @click.prevent="onClickClone"
                :disabled="cloneRequest.sent"
                variant="outline-primary"
                size="sm"
              >
                <span> Clone </span>
              </b-button>
              <b-button
                v-else-if="canEdit"
                @click.prevent="onClickEdit"
                variant="outline-primary"
                size="sm"
              >
                Edit
              </b-button>
            </b-button-group>
          </b-button-toolbar>
          <hr />
          <br />
          <SubmissionHistory
            v-if="viewingSubmissions"
            :problemId="routeProblemId"
          />
          <HorCylon v-else-if="!problem.recieved" />
          <Problem v-else :problem="problem.data" />
        </div>
      </template>
    </SingleView>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import Problem from '@/views/Problem.vue';
import SubmissionHistory from '@/views/SubmissionHistory.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import Backend from '@/js/backend/main';
import ProblemLink from '@/components/links/ProblemLink.vue';
import SingleView from '@/components/SingleView.vue';
import NotFound from '@/views/NotFound.vue';
import SearchLocationRegister from '@/components/search/registers/Location.vue';
import SearchEntityRegister from '@/components/search/registers/Entity.vue';

export default {
  components: {
    Problem,
    SubmissionHistory,
    HorCylon,
    SingleView,
    ProblemLink,
    NotFound,
    SearchLocationRegister,
    SearchEntityRegister,
  },

  data() {
    return {
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
      editRequest: {
        recieved: false,
        data: null,
      },
      solveRequest: {
        submitted: false,
        feedback: null,
      },
      cloneRequest: {
        sent: false,
        clonedProblem: null,
      },
    };
  },

  created() {
    Backend.getProblem(this.routeProblemId)
      .then((problem) => {
        this.problem = {
          recieved: true,
          data: problem,
        };
        if (!this.storageIsSigned) {
          return;
        }
        Backend.canEdit(this.storageUserId, {
          id: problem.owner.id,
          type: problem.owner.type.toLowerCase(),
        }).then((val) => {
          this.editRequest = {
            recieved: true,
            data: val,
          };
          Backend.canSolve(this.storageUserId, this.problem.data)
            .then((responseCanSolve) => {
              this.solveRequest = {
                recieved: true,
                data: responseCanSolve,
              };
            });
        });
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
      if (!this.viewingStatement) {
        this.$router.push(this.statementLink);
      }
    },

    onClickSubmissions() {
      if (!this.viewingSubmissions) {
        this.$router.push(this.submissionsLink);
      }
    },

    onClickEdit() {
      this.$router.push(`/problem-edit/${this.routeProblemId}`);
    },

    onClickClone() {
      this.cloneRequest.sent = true;
      Backend.cloneProblem(this.routeProblemId, this.storageUserId, this.storageAccessToken)
        .then((clonedProblem) => {
          this.cloneRequest.clonedProblem = clonedProblem;
          this.$router.push(`/problem/${this.cloneRequest.clonedProblem.id}`);
        })
        .catch((e) => {
          this.error = {
            has: true,
            message: e.toString(),
          };
        })
        .finally(() => {
          this.cloneRequest.sent = false;
        });
    },

    onClickSolve() {
      this.$router.push(`/problem/${this.solveRequest.data.id}`);
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
    ...mapGetters(['storageUserId', 'storageIsSigned', 'storageUser', 'storageAccessToken']),

    viewingSubmissions() {
      return this.view === 'submissions';
    },
    viewingStatement() {
      return this.view === 'statement';
    },
    statementLink() {
      return `/problem/${this.routeProblemId}/?view=statement`;
    },
    submissionsLink() {
      return `/problem/${this.routeProblemId}/?view=submissions`;
    },
    allReceived() {
      return this.solveRequest.recieved && this.editRequest.recieved;
    },
    canSolve() {
      return this.allReceived && this.solveRequest.data !== null;
    },
    canEdit() {
      return this.allReceived && this.editRequest.data;
    },
    canClone() {
      return this.allReceived && this.storageIsSigned && !this.canSolve && !this.canEdit;
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
