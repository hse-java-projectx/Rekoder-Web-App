<template>
  <div>
    <b-container v-if="notSignedAndNotQualified" class="mt-4 big-font">
      Please <router-link to="/signin">sign in</router-link> to see profile
    </b-container>
    <div v-else>
      <NotFound v-if="error.has" :message="error.message" />
      <HorCylon v-if="!userRequest.recieved" />
      <ProfileLayout
        v-else
        :statRefs="processedUserInformation.statRefs"
        :contacts="userRequest.data.contacts"
        :name="userRequest.data.name"
        :subname="userRequest.data.name"
        :avatarAlt="`${userRequest.data.name} profile avatar`"
        :avatarPath="userRequest.data.avatarPath"
        :bio="userRequest.data.bio"
      >
        <template #feed>
          <FeedBlock name="Archive">
            <template #content>
              <HorCylon v-if="!userRequest.recieved" />
              <ArchiveComponent v-else :showPath="false" />
            </template>
          </FeedBlock>
          <FeedBlock name="Recent activity">
            <template #content>
              <HorCylon v-if="!activitiesRequest.recieved" />
              <ActivityFeed
                v-else
                :activities="activitiesRequest.data"
                :anon="true"
              />
            </template>
          </FeedBlock>
        </template>
        <template #undername v-if="isSigned">
          <b-row>
            <b-col v-if="canEdit">
              <b-button
                variant="outline-primary"
                size="sm"
                class="w-100"
                @click.prevent="onClickEdit"
                >Edit
              </b-button>
            </b-col>
            <b-col v-if="canSignout">
              <b-button
                variant="outline-primary"
                size="sm"
                class="w-100"
                @click.prevent="onClickSignOut"
                >Sign out
              </b-button>
            </b-col>
          </b-row>
          <b-button
            v-if="canFollow"
            variant="outline-primary"
            size="sm"
            class="w-100"
            @click.prevent="onClickFollow"
            >Follow</b-button
          >
        </template>
      </ProfileLayout>
    </div>
  </div>
</template>

<script>
import ProfileLayout from '@/components/profile/ProfileLayout.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import NotFound from '@/views/NotFound.vue';
import ActivityFeed from '@/components/feed/ActivityFeed.vue';
import FeedBlock from '@/components/feed/FeedBlock.vue';
import ArchiveComponent from '@/components/ArchiveComponent.vue';

import Backend from '@/js/backend/main';
import { mapGetters } from 'vuex';

export default {
  props: {},

  components: {
    ProfileLayout,
    HorCylon,
    NotFound,
    ActivityFeed,
    FeedBlock,
    ArchiveComponent,
  },
  data() {
    return {
      routeProfileType: this.$route.params.profileType,
      rotueProfileId: this.$route.params.userId,

      error: {
        has: false,
        message: null,
      },

      processedUserInformation: {
        statRefs: [],
        contacts: [],
      },

      activitiesRequest: {
        recieved: false,
        data: [],
      },

      directionsRequest: {
        recieved: false,
        data: null,
      },

      userRequest: {
        recieved: false,
        data: null,
      },

      canEditRequest: {
        recieved: false,
        data: null,
      },
    };
  },

  computed: {
    ...mapGetters(['userid', 'isSigned', 'storeProfileType']),

    canEdit() {
      return this.canEditRequest.recieved && this.canEditRequest.data;
    },

    canFollow() {
      return this.canEditRequest.recieved && !this.canEditRequest.data;
    },

    canSignout() {
      return this.userid === this.pageProfileId;
    },

    notSignedAndNotQualified() {
      return (this.routeUserId === null || this.routeUserId === undefined) && !this.isSigned;
    },

    pageProfileType() {
      return this.routeProfileType === undefined || this.routeProfileType === null
        ? this.storeProfileType
        : this.routeProfileType;
    },

    pageProfileId() {
      return this.rotueProfileId === null || this.rotueProfileId === undefined
        ? this.userid
        : this.rotueProfileId;
    },
  },

  methods: {
    onClickEdit() {
      this.$router.push({ path: `/edit/${this.pageProfileType}/${this.pageProfileId}` });
    },

    onClickFollow() {},

    onClickSignOut() {
      this.$store.commit('signout');
      this.$router.push({ path: '/signin' });
    },
  },

  created() {
    if (this.notSignedAndNotQualified) {
      return;
    }
    Backend.getUserActivity(this.pageProfileId)
      .then((feed) => {
        this.activitiesRequest = {
          recieved: true,
          data: feed,
        };
      })
      .catch((err) => {
        this.error = {
          has: true,
          message: err.toString(),
        };
      });
    Backend.getUser(this.pageProfileType, this.pageProfileId)
      .then((user) => {
        this.userRequest = {
          recieved: true,
          data: { ...user },
        };
        if (this.pageProfileType === 'user') {
          this.processedUserInformation.statRefs.push(
            {
              name: 'following',
              num: user.following.length,
              ref: `/following/${this.pageProfileId}`,
            },
            {
              name: 'followers',
              num: user.followers.length,
              ref: `/followers/${this.pageProfileId}`,
            },
            {
              name: 'teams',
              num: user.teams.length,
              ref: `/teams/${this.pageProfileId}`,
            },
          );
          user.contacts.forEach((contact) => {
            this.processedUserInformation.contacts.push({
              key: contact.name,
              value: contact.ref,
              ref: contact.ref,
            });
          });
        } else if (this.pageProfileType === 'team') {
          this.processedUserInformation.statRefs.push({
            name: 'members',
            num: user.members.length,
            ref: `/members/${this.pageProfileId}`,
          });
        }
        this.userRequest.data.contacts = [];
        if (this.pageProfileType === 'judge') {
          this.userRequest.data.contacts.push({ name: 'origin', ref: user.origin });
        }
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
    Backend.canEdit(this.userid, this.pageProfileId)
      .then((can) => {
        this.canEditRequest = {
          recieved: true,
          data: can,
        };
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
  },
};
</script>
