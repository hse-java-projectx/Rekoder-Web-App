<template>
  <div>
    <HorCylon v-if="!user.recieved && !error.has" />
    <NotFound v-else-if="error.has" :message="error.message"/>
    <ProfileLayout
      v-else
      :statRefs="statRefs"
      :contacts="contacts"
      :name="user.data.name"
      :avatarAlt="`${user.data.name}'s Profile avatar`"
      :avatarPath="user.data.avatarPath"
      :bio="user.data.bio"
    >
    </ProfileLayout>
  </div>
</template>

<script>
import ProfileLayout from '@/components/profile/ProfileLayout.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import NotFound from '@/views/NotFound.vue';

import Backend from '@/js/backend/main';

export default {
  props: {},

  components: { ProfileLayout, HorCylon, NotFound },
  data() {
    return {
      routeUserId: this.$route.params.userId,
      user: {
        recieved: false,
        data: null,
      },
      error: {
        has: false,
        message: null,
      },
      statRefs: [],
      contacts: [],
    };
  },

  created() {
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
        this.error = {
          has: true,
          message: `Unable to load profile of user with id ${this.routeUserId}: ${er}`,
        };
      });
  },
};
</script>
