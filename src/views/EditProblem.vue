<template>
  <div>
    <SingleView>
      <template #header v-if="error.has">
        <NotFound :message="error.message" />
      </template>
      <template #content>
        <span class="big-font"> <b> Edit </b> </span>
        <div class="page-item-container m-0 m-md-3">
          <HorCylon v-if="!problemRecieved" />
          <b-form v-else @submit="onSubmit">
            <b-form-group label="Name" label-for="form-input-name">
              <b-form-input
                id="form-input-name"
                v-model="problem.name"
                placeholder="Enter problem name"
                :state="validation"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Statement" label-for="form-input-statement">
              <b-form-textarea
                id="form-input-statement"
                v-model="problem.statement"
                placeholder="Enter statement"
                :state="validation"
                required
              ></b-form-textarea>
            </b-form-group>
            <b-button class="mt-2" type="submit" variant="primary"
              >Save changes</b-button
            >
            <b-form-invalid-feedback :state="validation">
              {{ submissionInvalidFeedback.message }}
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
              {{ submissionValidFeedback.message }}
            </b-form-valid-feedback>
          </b-form>
        </div>
        <span class="big-font"> <b> Preview </b> </span>
        <div class="page-item-container m-0 m-md-3">
          <Problem
            v-if="user.recieved"
            :owner="userId"
            :name="problem.name"
            :statement="problem.statement"
          />
        </div>
      </template>
    </SingleView>
  </div>
</template>

<script>
import SingleView from '@/components/SingleView.vue';
import NotFound from '@/views/NotFound.vue';
import Problem from '@/views/Problem.vue';
import HorCylon from '@/components/animated/HorCylon.vue';

import Backend from '@/js/backend/main';

export default {
  data() {
    return {
      problemId: this.$route.params.problemId,
      userId: this.$route.params.userId,

      user: {
        recieved: false,
        data: null,
      },

      error: {
        has: false,
        message: null,
      },

      problem: {
        name: null,
        statement: null,
      },

      validation: undefined,

      submissionValidFeedback: {
        has: false,
        message: null,
      },

      submissionInvalidFeedback: {
        has: false,
        message: null,
      },

      problemRecieved: false,
    };
  },
  components: {
    SingleView,
    NotFound,
    Problem,
    HorCylon,
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      Backend.editProblem(this.userId, this.problemId, this.problem)
        .then(() => {
          this.submissionValidFeedback = {
            has: true,
            message: 'All changes have been saved',
          };
          this.validation = true;
        })
        .catch((er) => {
          this.submissionInvalidFeedback = {
            has: true,
            message: er.toString(),
          };
          this.validation = false;
        });
    },
  },
  created() {
    Backend.getUser(this.userId)
      .then((user) => {
        this.user = { recieved: true, data: user };
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
    Backend.getProblem(this.userId, this.problemId)
      .then((problem) => {
        this.problem = problem;
        this.problemRecieved = true;
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
  },
};
</script>

<style lang="sass" scoped>
@import "@/style/bootstrap-custom.scss"
@import "@/../node_modules/bootstrap/scss/bootstrap.scss"
</style>
