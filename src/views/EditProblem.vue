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
            <b-form-group label="Name" label-cols-md="2">
              <b-form-input
                v-model="problem.name"
                placeholder="Enter problem name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Statement" label-cols-md="2">
              <b-form-textarea
                v-model="problem.statement"
                placeholder="Enter statement"
                required
                debounce="100"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group label="Input format" label-cols-md="2">
              <b-form-textarea
                v-model="problem.inputFormat"
                placeholder="Enter input format"
                required
                debounce="100"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group label="Output format" label-cols-md="2">
              <b-form-textarea
                v-model="problem.outputFormat"
                placeholder="Enter output format"
                required
                debounce="100"
              ></b-form-textarea>
            </b-form-group>

            <div class="mb-4">
              <b-row>
                <b-col md="2" class="my-auto"> Examples </b-col>
                <b-col>
                  <b-row>
                    <b-col cols="1">
                      <b-button
                        size="sm"
                        variant="outline-success"
                        pill
                        @click.prevent="onClickAddTest"
                      >
                        +
                      </b-button></b-col
                    >
                    <b-col col> Input </b-col>
                    <b-col col> Output </b-col>
                  </b-row>
                  <div
                    v-for="(test, index) in problem.tests"
                    :key="index"
                    style="white-space: pre-wrap"
                  >
                    <hr class="m-2" />
                    <b-row>
                      <b-col cols="1">
                        <b-button
                          size="sm"
                          variant="outline-danger"
                          pill
                          @click.prevent="onClickRemoveTest(index)"
                        >
                          -
                        </b-button>
                      </b-col>
                      <b-col col>
                        <b-textarea v-model="test.input" />
                      </b-col>
                      <b-col col>
                        <b-textarea v-model="test.output" />
                      </b-col>
                    </b-row>
                  </div>
                  <b-row> </b-row>
                </b-col>
              </b-row>
            </div>

            <b-row v-if="user.recieved">
              <b-col cols="auto">
                <b-button type="submit" variant="success"
                  >Save changes</b-button
                >
              </b-col>
              <b-col cols="auto">
                <b-button variant="outline-danger" v-b-modal.modal-delete
                  >Delete problem</b-button
                >
              </b-col>
            </b-row>
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
          <Problem v-if="user.recieved" :owner="userId" :problem="problem" />
        </div>
      </template>
    </SingleView>
    <b-modal
      id="modal-delete"
      ref="modal-delete"
      title="Delete this problem"
      @ok="onProblemDelete"
      header-bg-variant="danger"
      header-text-variant="light"
      body-text-variant="secondary"
    >
      <b-container>
        <p>
          Are you sure? The entire history of this task will be deleted
          irretrievably, including all parcels on this problem.
        </p>
      </b-container>
    </b-modal>
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

      trash: {
        tests: [
          { input: 'sdfasdfasdfasdfa', output: 'sdfasdfasdfasdfa' },
          { input: 'sdfasdfasdfasdfa', output: 'sdfasdfasdfasdfa' },
        ],
      },

      problem: {
        name: null,
        statement: null,
        inputFormat: null,
        outputFormat: null,
        tests: [
          { input: 'sdfasdfasdfasdfa', output: 'sdfasdfasdfasdfa' },
          { input: 'sdfasdfasdfasdfa', output: 'sdfasdfasdfasdfa' },
        ],
        newTest: { input: null, output: null },
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
    onClickAddTest() {
      this.problem.tests.push({ input: null, output: null });
    },

    onClickRemoveTest(index) {
      this.problem.tests.splice(index, 1);
    },

    onProblemDelete() {
      Backend.deleteProblem(this.userId, this.problemId)
        .then(() => {
          this.$router.push(`/profile/${this.userId}/archive/${this.user.data.root}`);
        })
        .catch((er) => {
          this.error = {
            has: true,
            message: er.toString(),
          };
        });
    },
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
