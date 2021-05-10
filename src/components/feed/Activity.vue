<template>
  <b-container fluid class="p-0">
    <div class="page-item-container">
      <b-row>
        <b-col cols="auto" class="m-auto">
          <IconSmall :src="iconPath" :alt="type" class="m-1" />
        </b-col>
        <b-col>
          <span v-if="!anon">
            <router-link :to="objectLink"> {{ object.name }} </router-link>
          </span>
          <span class="text-secondary">
            {{ actionDescription }}
          </span>
          <b-container fluid>
            <router-link :to="subjectLink">
              <span class="big-font"> {{ subject.name }} </span>
            </router-link>
          </b-container>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>
<script>
import IconSmall from '@/components/avatars/IconSmall.vue';

export default {
  props: {
    anon: Boolean,
    type: String, // problem-attempt, problem-new, team-join, team-new, follow
    object: Object, // name: String, id: String
    subject: Object, // name: String, id: String
    count: Number,
  },

  components: { IconSmall },

  computed: {
    objectLink() {
      return `/profile/${this.object.id}`;
    },

    subjectLink() {
      switch (this.type) {
        case 'problem-attempt':
        case 'problem-new':
          return `/profile/${this.object.id}/problem/${this.subject.id}/?view=statement`;

        case 'team-join':
        case 'team-new':
        case 'follow':
          return `/profile/${this.subject.id}`;

        default:
          throw Error(`Undefined action type: ${this.type}`);
      }
    },

    actionDescription() {
      switch (this.type) {
        case 'problem-attempt': {
          return 'Attempted to solve problem';
        }
        case 'problem-new':
          return 'Created new problem';
        case 'team-join':
          return 'Joined team';
        case 'team-new':
          return 'Created team';
        case 'follow':
          return 'Followed';
        default:
          throw Error(`Undefined action type: ${this.type}`);
      }
    },

    iconPath() {
      switch (this.type) {
        case 'problem-attempt':
          return 'https://cdn3.iconfinder.com/data/icons/business-693/96/Business_Arrow_business_goal_target-512.png';
        case 'problem-new':
          return 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/hammer.png';
        case 'team-new':
          return 'http://pcmlp.socleg.ox.ac.uk/wp-content/uploads/2019/12/Icon-Teams.png';
        case 'team-join':
          return 'https://static.thenounproject.com/png/1007187-200.png';
        case 'follow':
          return 'https://freepikpsd.com/wp-content/uploads/2019/10/logo-contact-person-png-Transparent-Images.png';
        default:
          throw Error(`Undefined action type: ${this.type}`);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap
</style>
