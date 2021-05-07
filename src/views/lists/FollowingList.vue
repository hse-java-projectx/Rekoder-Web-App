<template>
  <SplitView>
    <template #header>
      <SubNavbar>
        <template #left> <b> Followers </b> </template>
      </SubNavbar>
    </template>
    <template #content>
      <HorCylon v-if="!following.recieved" />
      <b-list-group v-else-if="!error.hasError">
        <b-list-group-item
          v-for="followee in following.data"
          :key="followee.id"
        >
          <TeamListItem :team="getFollowingObjectFromFollowing(followee)" />
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
import SubNavbar from '@/components/SubNavbar.vue';

export default {
  data() {
    return {
      routeUserId: this.$route.params.userId,
      following: {
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
    SubNavbar,
  },

  created() {
    Backend.getUserFollowing(this.routeUserId)
      .then((following) => {
        this.following = {
          recieved: true,
          data: following,
        };
      })
      .catch(() => {
        this.error = {
          hasError: true,
          error: `Unable to get followees of user with id ${this.routeUserId}`,
        };
      });
  },

  methods: {
    getFollowingObjectFromFollowing(followee) {
      return {
        name: followee.name,
        ref: `/profile/${followee.id}`,
        avatarAlt: `${followee.name}'s avatar`,
        avatarPath: followee.avatarPath,
      };
    },
  },
};
</script>
<style lang="sass">
</style>
