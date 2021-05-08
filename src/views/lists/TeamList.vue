<template>
  <SplitView>
    <template #content>
      <HorCylon v-if="!teams.recieved" />
      <b-list-group v-else-if="!error.hasError">
        <b-list-group-item v-for="team in teams.data" :key="team.id">
          <ListItem :team="getTeamObjectFromTeam(team)" />
        </b-list-group-item>
      </b-list-group>
      <NotFound v-else :message="error.message" />
    </template>
    <template #additional>
      <ProfileCardLayout :userId="routeUserId" />
    </template>
  </SplitView>
</template>
<script>
import Backend from '@/js/backend/main';
import ListItem from '@/views/lists/ListItem.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import SplitView from '@/components/SplitView.vue';
import NotFound from '@/views/NotFound.vue';
import ProfileCardLayout from '@/components/profile/ProfileCardLayout.vue';

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
    SplitView,
    NotFound,
    ProfileCardLayout,
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
        ref: '/',
        avatarAlt: `${team.name}'s avatar`,
        avatarPath: team.avatarPath,
      };
    },
  },
};
</script>
<style lang="sass">
</style>
