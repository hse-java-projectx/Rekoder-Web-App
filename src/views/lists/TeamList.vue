<template>
  <SplitView>
    <template #content>
      <HorCylon v-if="!teams.recieved" />
      <b-list-group v-else-if="!error.hasError">
        <b-list-group-item v-for="team in teams.data" :key="team.id">
          <TeamListItem :team="getTeamObjectFromTeam(team)" />
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
import TeamListItem from '@/components/team/TeamListItem.vue';
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
    TeamListItem,
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
        avatarPath:
          'https://icon2.cleanpng.com/20180715/ea/kisspng-person-logo-royalty-free-people-travel-5b4bde06941fa6.8784224315316986946067.jpg',
      };
    },
  },
};
</script>
<style lang="sass">
</style>
