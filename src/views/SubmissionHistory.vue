<template>
  <div>
    <NotFound v-if="error.has" :message="error.message" />
    <HorCylon v-else-if="!submissions.recieved" />
    <b-table
      v-else
      :items="submissions.data"
      :fields="fields"
      :responsive="true"
    >
      <template #cell(id)="data">
        <SubmissionLink :id="data.value.toString()" />
      </template>
      <template #cell(date)="data">
        {{ new Date(data.value).toLocaleString() }}
      </template>
      <template #cell(feedback)="data">
        <div
          :class="
            data.value.verdict === 'ok' ? 'text-success' : 'text-danger'
          "
        >
          <b>{{ data.value.verdict.toUpperCase() }}</b>
        </div>
      </template>
    </b-table>
  </div>
</template>
<script>
import SubmissionLink from '@/components/links/SubmissionLink.vue';
import NotFound from '@/views/NotFound.vue';
import HorCylon from '@/components/animated/HorCylon.vue';

import Backend from '@/js/backend/main';

export default {
  components: { SubmissionLink, NotFound, HorCylon },

  props: {
    problemId: String,
    /*
      Object: {
        id: String,
        language: String,
        date: Date,
        comment: String
      }
    */
  },

  data() {
    return {
      fields: ['id', 'date', 'language', 'feedback'],
      error: {
        has: false,
        message: null,
      },
      submissions: {
        recieved: false,
        data: null,
      },
    };
  },

  created() {
    Backend.getProblemSubmissions(this.problemId)
      .then((submissions) => {
        const cutted = [];
        submissions.forEach((s) => {
          cutted.push({
            id: s.id,
            language: s.compiler,
            date: s.submissionTime,
            feedback: s.feedback,
          });
        });
        cutted.sort((a, b) => a.date - b.date);
        this.submissions = {
          recieved: true,
          data: cutted,
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

<style lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap
</style>
