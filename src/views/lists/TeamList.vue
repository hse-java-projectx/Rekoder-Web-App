<template>
  <SingleView>
    <template #header>
      <b class="big-font"> Teams </b>
    </template>
    <template #content>
      <HorCylon v-if="!teams.recieved" />
      <NotFound v-else-if="error.hasError" :message="error.message" />
      <NothingToShow v-else-if="teams.data.length === 0" message="Teams list is empty" />
      <b-list-group v-else>
        <b-list-group-item v-for="team in teams.data" :key="team.id">
          <ListItem :team="getTeamObjectFromTeam(team)" />
        </b-list-group-item>
      </b-list-group>
    </template>
    <template #additional>
      <ProfileCardLayout :userId="routeUserId" />
    </template>
  </SingleView>
</template>
<script>

import Backend from '@/js/backend/main';
import ListItem from '@/views/lists/ListItem.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import SingleView from '@/components/SingleView.vue';
import NotFound from '@/views/NotFound.vue';
import ProfileCardLayout from '@/components/profile/ProfileCardLayout.vue';
import NothingToShow from '@/components/NothingToShow.vue';

export default {
  data() {
    return {
      routeUserId: this.$route.params.userId,
      teams: {
        recieved: false,
        data: [],
      },
      error: {
        hasError: false,
        error: null,
      },
    };
  },

  components: {
    ListItem,
    HorCylon,
    SingleView,
    NotFound,
    ProfileCardLayout,
    NothingToShow,
  },

  created() {
    Backend.getUserTeams(this.routeUserId)
      .then((teams) => {
        this.teams = {
          recieved: true,
          data: teams,
        };
      })
      .catch(() => {
        this.error = {
          hasError: true,
          error: `Unable to get teams list of user with id ${this.routeUserId}`,
        };
      });
  },

  methods: {
    getTeamObjectFromTeam(team) {
      return {
        name: team.name,
        ref: `/profile/${team.id}`,
        avatarAlt: `${team.name}'s avatar`,
        avatarPath: team.avatarPath,
      };
    },
  },
};
</script>
<style lang="sass">
</style>
