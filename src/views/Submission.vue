<template>
  <div>
    <SingleView>
      <template #header>
        <NotFound v-if="error.has" :message="error.message" />
      </template>

      <template #content>
        <div class="page-item-container">
          <div class="big-font">
            <ProfileLink
              v-if="submission.recieved"
              :id="submission.data.authorId.toString()"
            />
            <b-icon icon="chevron-right" scale="0.7" />
            <ProblemLink
              v-if="submission.recieved"
              :problem="submission.data.problemId.toString()"
              :name="submission.data.problemId.toString()"
              view="submissions"
            /><b-icon icon="chevron-right" scale="0.7" /> #
            {{ routeSubmissionId }}
          </div>

          <hr class="mt-1 w-100" />
          <HorCylon v-if="!submission.recieved" />
          <div v-else>
            <b-list-group class="information mb-3">
              <b-list-group-item class="d-flex justify-content-between">
                <span> Problem </span>
                <span
                  ><ProblemLink
                    :problem="submission.data.problemId.toString()"
                    :name="submission.data.problemId.toString()"
                    view="submissions"
                /></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span> Author </span>
                <ProfileLink :id="submission.data.authorId" />
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span> Date </span>
                <span>
                  {{
                    new Date(submission.data.submissionTime).toLocaleString()
                  }}
                </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span> Feedback </span>
                <div>
                  <b>{{ submission.data.feedback }}</b>
                </div>
              </b-list-group-item>
            </b-list-group>
            <code-highlight :class="submission.data.compiler">
              <span>{{ submission.data.sourceCode }}</span>
            </code-highlight>
          </div>
        </div>
      </template>
    </SingleView>
  </div>
</template>
<script>
import CodeHighlight from 'vue-code-highlight/src/CodeHighlight.vue';
import NotFound from '@/views/NotFound.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import SingleView from '@/components/SingleView.vue';
import ProblemLink from '@/components/links/ProblemLink.vue';
import ProfileLink from '@/components/links/ProfileLink.vue';

import Backend from '@/js/backend/main';

import 'vue-code-highlight/themes/prism.css';

export default {
  data() {
    return {
      routeSubmissionId: this.$route.params.submissionId,
      submission: {
        recieved: false,
        data: null,
      },
      error: {
        has: false,
        message: null,
      },
    };
  },

  components: {
    CodeHighlight,
    NotFound,
    HorCylon,
    SingleView,
    ProblemLink,
    ProfileLink,
  },

  created() {
    Backend.getSubmission(this.routeSubmissionId)
      .then((submission) => {
        this.submission = {
          recieved: true,
          data: submission,
        };
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

.code {
  font-family: "Roboto Mono", monospace;
}
</style>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.information
  width: 50%

@media (max-width: $grid-lg)
  .information
    width: 100%

.ver-ok
  color: $green

.ver-nok
  color: $red
</style>
