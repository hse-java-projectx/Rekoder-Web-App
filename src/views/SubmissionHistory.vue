<template>
  <div>
    <div class="page-item-container">
      <b-table :items="submissions">
        <template #cell(id)="data">
          <SubmissionLink :profile="owner" :id="data.value" />
        </template>
        <template #cell(date)="data">
          {{ data.value.toLocaleString() }}
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import SubmissionLink from '@/components/links/SubmissionLink.vue';

export default {
  components: { SubmissionLink },
  props: {
    owner: String,
    problem: String,
    submissions: Array[Object],
  },
};
</script>
<style lang="sass">
</style>
