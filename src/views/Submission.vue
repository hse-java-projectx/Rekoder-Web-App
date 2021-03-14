<template>
  <div>
    <SubNavbar>
      <template #left>
        Submission
        <router-link :to="'submission/' + submission.id">
          #{{ submission.id }}
        </router-link>
        <b-badge variant="warning" class="text-light" pill>Head</b-badge>
      </template>
    </SubNavbar>
    <div class="page-item-container">
      <h2>Information</h2>
      <b-list-group class="information">
        <b-list-group-item class="d-flex justify-content-between">
          <span> Problem </span>
          <span>{{ submissionInfo.problem }}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <span> Parent </span>
          <span> {{ submissionInfo.parent }} </span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <span> Date </span>
          <span> {{ submissionInfo.date }} </span>
        </b-list-group-item>
      </b-list-group>
      <h2>Source code</h2>
      <code-highlight :class="submission.language">
        {{ submission.sourceCode }}
      </code-highlight>
    </div>
  </div>
</template>
<script>
import CodeHighlight from 'vue-code-highlight/src/CodeHighlight.vue';
import 'vue-code-highlight/themes/prism.css';
import SubNavbar from '@/components/SubNavbar.vue';

export default {
  props: {
    submission: Object,
  },
  components: {
    CodeHighlight,
    SubNavbar,
  },
  data() {
    return {};
  },
  computed: {
    submissionInfo() {
      return {
        problem: this.submission.problem,
        parent: this.submission.parentSubmission,
        date: this.submission.time.toLocaleString(),
      };
    },
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
</style>
