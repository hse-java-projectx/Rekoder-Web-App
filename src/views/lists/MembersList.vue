<template>
  <SplitView>
    <template #subheader>
      <b class="big-font"> Team Members </b>
    </template>
    <template #content>
      <HorCylon v-if="!teamMembersRequest.recieved" />
      <b-list-group v-else-if="!error.hasError">
        <b-list-group-item
          v-for="member in teamMembersRequest.data"
          :key="member.id"
        >
          <ListItem :team="getObject(member)" />
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
      teamMembersRequest: {
        recieved: false,
        data: null,
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
    Backend.getTeamMembers(this.routeUserId)
      .then((members) => {
        this.teamMembersRequest = {
          recieved: true,
          data: { ...members },
        };
      })
      .catch(() => {
        this.error = {
          hasError: true,
          error: `Unable to get members of team with id ${this.routeUserId}`,
        };
      });
  },

  methods: {
    getObject(teamMember) {
      return {
        name: teamMember.name,
        ref: `/profile/${teamMember.id}`,
        avatarAlt: `${teamMember.name} avatar`,
        avatarPath: teamMember.avatarPath,
      };
    },
  },
};
</script>
<style lang="sass">
</style>
