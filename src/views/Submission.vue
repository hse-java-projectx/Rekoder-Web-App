<template>
  <div>
    <SplitView>
      <template #header>
        <NotFound v-if="error.has" :message="error.message" />
      </template>

      <template #content>
        <div class="page-item-container">
          <div class="big-font">
            <FolderLink
              v-if="owner.recieved"
              :name="owner.data.name"
              :userId="routeUserId"
              :folderId="owner.data.root"
            />
            <b-icon icon="chevron-right" scale="0.7" />
            <ProblemLink
              :profile="routeUserId"
              :problem="routeProblemId"
              :name="submission.recieved ? submission.data.problem : ''"
              view="submissions"
            /><b-icon icon="chevron-right" scale="0.7" />
            <SubmissionLink
              :profile="routeUserId"
              :problem="routeProblemId"
              :id="routeSubmissionId"
            />
          </div>

          <hr class="mt-1 w-100" />
          <div v-if="submission.recieved">
            <b-list-group class="information mb-3">
              <b-list-group-item class="d-flex justify-content-between">
                <span> Problem </span>
                <span>{{ submission.data.problem }}</span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span> Date </span>
                <span> {{ submission.data.date.toLocaleString() }} </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span> Verdict </span>
                <div :class="submission.data.ok ? 'ver-ok' : 'ver-nok'">
                  <b>{{ submission.data.comment }}</b>
                </div>
              </b-list-group-item>
            </b-list-group>
            <code-highlight :class="submission.data.language">
              {{ submission.data.source }}
            </code-highlight>
          </div>
          <HorCylon v-else />
        </div>
      </template>

      <template #additional>
        <ProfileCardLayout :userId="routeUserId"
      /></template>
    </SplitView>
  </div>
</template>
<script>
import CodeHighlight from 'vue-code-highlight/src/CodeHighlight.vue';
import NotFound from '@/views/NotFound.vue';
import SubmissionLink from '@/components/links/SubmissionLink.vue';
import FolderLink from '@/components/links/FolderLink.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import SplitView from '@/components/SplitView.vue';
import ProfileCardLayout from '@/components/profile/ProfileCardLayout.vue';
import ProblemLink from '@/components/links/ProblemLink.vue';

import Backend from '@/js/backend/main';

import 'vue-code-highlight/themes/prism.css';

export default {
  components: {
    CodeHighlight,
    NotFound,
    SubmissionLink,
    HorCylon,
    FolderLink,
    SplitView,
    ProfileCardLayout,
    ProblemLink,
  },

  created() {
    Backend.getSubmission(this.routeUserId, this.routeProblemId, this.routeSubmissionId)
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
    Backend.getUser(this.routeUserId)
      .then((user) => {
        this.owner = {
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

  data() {
    return {
      routeUserId: this.$route.params.userId,
      routeSubmissionId: this.$route.params.submissionId,
      routeProblemId: this.$route.params.problemId,
      submission: {
        recieved: false,
        data: null,
      },
      error: {
        has: false,
        message: null,
      },
      owner: {
        recieved: false,
        data: null,
      },
    };
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
