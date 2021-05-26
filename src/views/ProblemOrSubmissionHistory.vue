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
          <b-row>
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
          <br />
          <SubmissionHistory
            v-if="viewingSubmissions"
            :problemId="routeProblemId"
          />
          <HorCylon v-else-if="!problem.recieved" />
          <Problem v-else :problem="problem.data">
            <template #under-solve>
              <b-button
                v-if="canClone"
                variant="outline-success"
                @click.prevent="onClickClone"
                size="sm"
              >
                <span> Clone </span>
              </b-button>
              <b-button
                v-else-if="canEdit"
                variant="outline-primary"
                @click.prevent="onClickEdit"
                size="sm"
              >
                Edit
              </b-button>
              <b-button
                v-else-if="canSolve"
                variant="outline-info"
                @click.prevent="onClickSolve"
                size="sm"
              >
                Solve
              </b-button>
            </template>
          </Problem>
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
      radio: {
        options: [
          { text: 'Statement', value: 'statement' },
          { text: 'Submissions', value: 'submissions' },
        ],
      },
      editRequest: {
        recieved: false,
        data: null,
      },
      solveRequest: {
        submitted: false,
        feedback: null,
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
          if (this.editRequest.data) {
            return;
          }
          Backend.canSolve(this.storageUserId, this.routeProblemId).then((responseCanSolve) => {
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
      this.$router.push(this.statementLink);
    },

    onClickSubmissions() {
      this.$router.push(this.submissionsLink);
    },

    onClickEdit() {
      this.$router.push(`/problem-edit/${this.routeProblemId}`);
    },

    onClickClone() {
      Backend.copyProblem(this.routeProblemId, this.storageUserId);
    },

    onClickSolve() {},
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
    ...mapGetters(['storageUserId', 'storageIsSigned', 'storageUser']),

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
    canSolve() {
      return this.solveRequest.recieved && this.solveRequest.data;
    },
    canEdit() {
      return this.editRequest.recieved && this.editRequest.data;
    },
    canClone() {
      return this.storageIsSigned && !this.canSolve && !this.canEdit;
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
