<template>
  <div>
    <SubNavbar>
      <template #left> {{ submitter }} submissions for {{ problem }} </template>
      <template #right> </template>
    </SubNavbar>
    <div class="page-item-container">
      <b-table :items="submissions">
        <template #cell(id)="data">
          <SubmissionLink :profile="submitter" :id="data.value" />
        </template>
        <template #cell(date)="data">
          {{ data.value.toLocaleString() }}
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import SubNavbar from '@/components/SubNavbar.vue';
import SubmissionLink from '@/components/links/SubmissionLink.vue';

export default {
  components: { SubNavbar, SubmissionLink },
  data() {
    return {
      submitter: 'Glebanister',
      problem: 'A + B problem',
      submissions: [
        {
          id: 'bac628a',
          verdict: 'OK',
          date: new Date(),
        },
        {
          id: '5fb28d1',
          verdict: 'CE',
          date: new Date(),
        },
        {
          id: '4ac6cfc',
          verdict: 'PE',
          date: new Date(),
        },
      ],
    };
  },
};
</script>
<style lang="sass">
</style>
