<template>
  <div>
    <SubNavbar>
      <template #left>
        <ProfileLink :profile="routeUserId" />/
        {{ submission.recieved ? submission.data.problem : "" }} /
        <SubmissionLink
          :profile="routeUserId"
          :problem="routeProblemId"
          :id="routeSubmissionId"
        />
      </template>
    </SubNavbar>
    <div v-if="submission.recieved" class="page-item-container">
      <h2>Information</h2>
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
      <h2>Source code</h2>
      <code-highlight :class="submission.data.language">
        {{ submission.data.source }}
      </code-highlight>
    </div>
    <HorCylon v-else />
  </div>
</template>
<script>
import CodeHighlight from 'vue-code-highlight/src/CodeHighlight.vue';
import SubNavbar from '@/components/SubNavbar.vue';
import SubmissionLink from '@/components/links/SubmissionLink.vue';
import ProfileLink from '@/components/links/ProfileLink.vue';
import HorCylon from '@/components/animated/HorCylon.vue';

import Backend from '@/js/backend/main';

import 'vue-code-highlight/themes/prism.css';

export default {
  components: {
    CodeHighlight,
    SubNavbar,
    SubmissionLink,
    HorCylon,
    ProfileLink,
  },

  created() {
    Backend.getSubmission(this.routeUserId, this.routeProblemId, this.routeSubmissionId)
      .then((submission) => {
        this.submission = {
          recieved: true,
          data: submission,
        };
      })
      .catch(() => {
        /* TODO */
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
@import "src/style/bootstrap-custom.scss"

.information
  width: 50%

@media (max-width: $grid-lg)
  .information
    width: 100%

@import "src/style/bootstrap-custom.scss"

.ver-ok
  color: $green

.ver-nok
  color: $red
</style>
