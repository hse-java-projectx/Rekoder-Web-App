<template>
  <b-container fluid class="p-0">
    <HorCylon v-if="!user.recieved" />
    <div v-else class="page-item-container">
      <b-row>
        <b-col cols="9" md="12">
          <div class="mt-md-1 text-dark text-center" style="font-size: 16pt">
            <b>{{ user.data.name }}</b>
          </div>
          <div class="my-md-2 profile-bio">
            <i>{{ user.data.bio }}</i>
          </div>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col v-for="{ name, num, ref } in links" :key="name" col md="12">
          <router-link :to="ref" class="text-primary profile-numbers">
            <b> {{ num }} </b>
            <div style="display: inline">{{ name }}</div>
          </router-link>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import Backend from '@/js/backend/main';
import HorCylon from '@/components/animated/HorCylon.vue';

export default {
  components: {
    HorCylon,
  },

  props: {
    userId: String,
  },

  created() {
    Backend.getUser(this.userId).then((user) => {
      this.user = {
        recieved: true,
        data: user,
      };
      this.links.push({
        name: 'following',
        num: user.following.length,
        ref: `/profile/${this.userId}/following`,
      });
      this.links.push({
        name: 'followers',
        num: user.followers.length,
        ref: `/profile/${this.userId}/followers`,
      });
      this.links.push({
        name: 'teams',
        num: user.teams.length,
        ref: `/profile/${this.userId}/teams`,
      });
    });
  },

  data() {
    return {
      user: {
        recieved: false,
        data: null,
      },
      links: [],
    };
  },
};
</script>

<style scoped lang="sass">
@import src/style/bootstrap-custom.scss
@import bootstrap/scss/bootstrap

.profile-name
  font-size: 14pt
  text-align: center

.profile-bio
  font-size: 11pt

.profile-numbers
  font-size: 10pt

@media (min-width: $grid-md)
  .profile-name
    font-size: 20pt

  .profile-bio
    font-size: 12pt

  .profile-numbers
    font-size: 12pt
</style>
