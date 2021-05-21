<template>
  <SingleView>
    <template #header>
      <b class="big-font"> Following </b>
    </template>
    <template #content>
      <HorCylon v-if="!following.recieved" />
      <NotFound v-else-if="error.hasError" :message="error.message" />
      <NothingToShow v-else-if="following.data.length === 0" message="Followees list is empty" />
      <b-list-group v-else>
        <b-list-group-item
          v-for="followee in following.data"
          :key="followee.id"
        >
          <ListItem :team="getFollowingObjectFromFollowing(followee)" />
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
    ListItem,
    HorCylon,
    SingleView,
    NotFound,
    ProfileCardLayout,
    NothingToShow,
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
