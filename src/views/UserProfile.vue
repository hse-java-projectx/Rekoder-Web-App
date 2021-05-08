<template>
  <div>
    <HorCylon v-if="!user.recieved && !userError.has" />
    <NotFound v-else-if="userError.has" :message="userError.message" />
    <ProfileLayout
      v-else
      :statRefs="statRefs"
      :contacts="contacts"
      :name="user.data.name"
      :avatarAlt="`${user.data.name}'s profile avatar`"
      :avatarPath="user.data.avatarPath"
      :bio="user.data.bio"
    >
      <template #feed>
        <b-container fluid class="my-2">
          <span class="big-font"> <b> Recent activity </b> </span>
        </b-container>
        <HorCylon v-if="!activities.recieved && !activitiesError.has" />
        <NotFound v-else-if="activitiesError.has" :message="activitiesError.message" />
        <ActivityFeed v-else :activities="activities.data" :anon="true" />
      </template>
    </ProfileLayout>
  </div>
</template>

<script>
import ProfileLayout from '@/components/profile/ProfileLayout.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import NotFound from '@/views/NotFound.vue';
import ActivityFeed from '@/components/feed/ActivityFeed.vue';

import Backend from '@/js/backend/main';

export default {
  props: {},

  components: {
    ProfileLayout,
    HorCylon,
    NotFound,
    ActivityFeed,
  },
  data() {
    return {
      routeUserId: this.$route.params.userId,
      user: {
        recieved: false,
        data: [],
      },
      userError: {
        has: false,
      },
      activities: {
        recieved: false,
        data: [],
      },
      activitiesError: {
        has: false,
      },
      statRefs: [],
      contacts: [],
    };
  },

  created() {
    Backend.getUserActivity(this.routeUserId)
      .then((feed) => {
        this.activities = {
          recieved: true,
          data: feed,
        };
      })
      .catch((err) => {
        this.activitiesError = {
          has: true,
          message: err,
        };
      });
    Backend.getUser(this.routeUserId)
      .then((user) => {
        this.user = {
          recieved: true,
          data: user,
        };
        this.statRefs.push({
          name: 'following',
          num: user.following.length,
          ref: `/profile/${this.routeUserId}/following`,
        });
        this.statRefs.push({
          name: 'followers',
          num: user.followers.length,
          ref: `/profile/${this.routeUserId}/followers`,
        });
        this.statRefs.push({
          name: 'teams',
          num: user.teams.length,
          ref: `/profile/${this.routeUserId}/teams`,
        });
        Object.keys(user.contacts).forEach((contact) => {
          this.contacts.push({
            key: contact,
            value: user.contacts[contact],
            ref: '/',
          });
        });
      })
      .catch((er) => {
        this.userError = {
          has: true,
          message: `Unable to load profile of user with id ${this.routeUserId}: ${er}`,
        };
      });
  },
};
</script>
