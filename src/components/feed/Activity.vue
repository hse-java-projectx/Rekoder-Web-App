<template>
  <b-container fluid class="p-0">
    <div class="page-item-container">
      <b-row>
        <b-col cols="auto" class="m-auto">
          <Icon
            :src="iconPath"
            :alt="type"
            class="m-1"
          />
        </b-col>
        <b-col>
          <span v-if="!anon">
            <router-link :to="objectLink"> {{ object.name }} </router-link>
          </span>
          {{ actionDescription }}
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
import Icon from '@/components/avatars/IconSmall.vue';

export default {
  props: {
    anon: Boolean,
    type: String, // problem-attempt, problem-new, team-join, team-new, follow
    object: Object, // name: String, id: String
    subject: Object, // name: String, id: String
    count: Number,
  },

  components: { Icon },

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
          return 'https://www.flaticon.com/svg/vstatic/svg/3176/3176382.svg?token=exp=1620493715~hmac=f5a8931a9d314d93a0ecc2f4c94a304d';
        case 'problem-new':
          return 'https://www.flaticon.com/svg/vstatic/svg/1828/1828757.svg?token=exp=1620493937~hmac=2f0bf88464f25d3dd2c3b7347c649ade';
        case 'team-new':
          return 'https://www.flaticon.com/svg/vstatic/svg/681/681392.svg?token=exp=1620493981~hmac=a7deeb2f02b70ee362e24740f28478ec';
        case 'team-join':
          return 'https://www.flaticon.com/svg/vstatic/svg/2754/2754478.svg?token=exp=1620494005~hmac=f2bd54efc59114f9a8be0aaf64558aed';
        case 'follow':
          return 'https://www.flaticon.com/svg/vstatic/svg/2097/2097654.svg?token=exp=1620494040~hmac=7cd8d1fd6442964d47f063c563849ceb';
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
