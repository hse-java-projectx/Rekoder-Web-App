<template>
  <SplitView>
    <template #subheader>
      <b class="big-font"> Followers </b>
    </template>
    <template #content>
      <HorCylon v-if="!followers.recieved" />
      <b-list-group v-else-if="!error.hasError">
        <b-list-group-item
          v-for="follower in followers.data"
          :key="follower.id"
        >
          <ListItem :team="getFollowerObjectFromFollower(follower)" />
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
      followers: {
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
    Backend.getUserFollowers(this.routeUserId)
      .then((followers) => {
        this.followers = {
          recieved: true,
          data: followers,
        };
      })
      .catch(() => {
        this.error = {
          hasError: true,
          error: `Unable to get followers of user with id ${this.routeUserId}`,
        };
      });
  },

  methods: {
    getFollowerObjectFromFollower(follower) {
      return {
        name: follower.name,
        ref: `/profile/${follower.id}`,
        avatarAlt: `${follower.name}'s avatar`,
        avatarPath: follower.avatarPath,
      };
    },
  },
};
</script>
<style lang="sass">
</style>
