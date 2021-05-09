<template>
  <div>
    <b-table :items="submissions" :fields="fields" :responsive="true">
      <template #cell(id)="data">
        <SubmissionLink
          :profile="owner"
          :problem="problemId"
          :id="data.value"
        />
      </template>
      <template #cell(date)="data">
        {{ data.value.toLocaleString() }}
      </template>
      <template #cell(comment)="data">
        <div>
          <b>{{ data.value }}</b>
        </div>
      </template>
    </b-table>
  </div>
</template>
<script>
import SubmissionLink from '@/components/links/SubmissionLink.vue';

export default {
  components: { SubmissionLink },
  data() {
    return {
      fields: ['id', 'comment', 'date', 'language'],
    };
  },
  props: {
    owner: String,
    problem: String,
    problemId: String,
    submissions: Array[Object],
    /*
      Object: {
        id: String,
        language: String,
        date: Date,
        comment: String
      }
    */
  },
};
</script>

<style lang="sass">
@import "src/style/bootstrap-custom.scss"

.ver-ok
  color: $green

.ver-nok
  color: $red
</style>
