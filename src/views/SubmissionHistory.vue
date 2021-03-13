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
        <template #cell(parentId)="data">
          <SubmissionLink :profile="submitter" :id="data.value" />
        </template>
        <template #cell(date)="data">
          {{ data.value.toLocaleString() }}
        </template>
        <template #cell(isHead)="data">
          <b-badge v-if="data.value" variant="warning" class="text-light" pill
            >Head</b-badge
          >
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
          isHead: false,
          parentId: '1cbf791',
        },
        {
          id: '5fb28d1',
          verdict: 'CE',
          date: new Date(),
          isHead: true,
          parentId: '1cbf791',
        },
        {
          id: '4ac6cfc',
          verdict: 'PE',
          date: new Date(),
          isHead: false,
          parentId: '1cbf791',
        },
      ],
    };
  },
};
</script>
<style lang="sass">
</style>
