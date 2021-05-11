<template>
  <div>
    <NotFound v-if="error.has" :message="error.message" />
    <HorCylon v-if="!userRequest.recieved" />
    <ProfileLayout
      v-else
      :statRefs="processedUserInformation.statRefs"
      :contacts="userRequest.data.contacts"
      :name="userRequest.data.name"
      :avatarAlt="`${userRequest.data.name} profile avatar`"
      :avatarPath="userRequest.data.avatarPath"
      :bio="userRequest.data.bio"
    >
      <template #feed>
        <FeedBlock name="Archive">
          <template #content>
            <HorCylon v-if="!directionsRequest.recieved" />
            <NothingToShow
              v-else-if="directionsRequest.data.length === 0"
              message="Archive is empty"
            />
            <b-list-group v-else>
              <DirectoryItem
                v-for="item in directionsRequest.data"
                :key="item.link"
                :name="item.name"
                :isDirectory="item.isDirectory"
                :link="item.link"
                :solved="item.solved"
              />
            </b-list-group>
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
</template>

<script>
import ProfileLayout from '@/components/profile/ProfileLayout.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import NotFound from '@/views/NotFound.vue';
import ActivityFeed from '@/components/feed/ActivityFeed.vue';
import FeedBlock from '@/components/feed/FeedBlock.vue';
import DirectoryItem from '@/components/archive/DirectoryItem.vue';
import NothingToShow from '@/components/NothingToShow.vue';

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
    DirectoryItem,
    NothingToShow,
  },
  data() {
    return {
      routeUserId: this.$route.params.userId,

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
    ...mapGetters(['userid', 'isSigned']),

    canEdit() {
      return this.canEditRequest.recieved && this.canEditRequest.data;
    },

    canFollow() {
      return this.canEditRequest.recieved && !this.canEditRequest.data;
    },

    canSignout() {
      return this.userid === this.routeUserId;
    },
  },

  methods: {
    async getDirections() {
      const dirs = [];
      const folderContent = await Backend.getFolderContent(
        this.routeUserId,
        this.userRequest.data.root,
      );
      folderContent.forEach((dir) => {
        dirs.push({
          name: dir.name,
          isDirectory: dir.isDirectory,
          solved: dir.solved,
          link: dir.isDirectory
            ? `/profile/${this.routeUserId}/archive/${dir.id}`
            : `/profile/${this.routeUserId}/problem/${dir.id}/?view=statement`,
        });
      });
      return dirs;
    },

    onClickEdit() {
      this.$router.push({ path: `/profile-edit/${this.routeUserId}` });
    },

    onClickFollow() {},

    onClickSignOut() {
      this.$store.commit('signout');
      this.$router.push({ path: '/signin' });
    },
  },

  created() {
    Backend.getUserActivity(this.routeUserId)
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
    Backend.getUser(this.routeUserId)
      .then((user) => {
        this.userRequest = {
          recieved: true,
          data: { ...user },
        };
        if (user.type === 'user') {
          this.processedUserInformation.statRefs.push(
            {
              name: 'following',
              num: user.following.length,
              ref: `/profile/${this.routeUserId}/following`,
            },
            {
              name: 'followers',
              num: user.followers.length,
              ref: `/profile/${this.routeUserId}/followers`,
            },
            {
              name: 'teams',
              num: user.teams.length,
              ref: `/profile/${this.routeUserId}/teams`,
            },
          );
          user.contacts.forEach((contact) => {
            this.processedUserInformation.contacts.push({
              key: contact.name,
              value: contact.ref,
              ref: contact.ref,
            });
          });
        }
        this.userRequest.data.contacts = [];
        if (user.type === 'system') {
          this.userRequest.data.contacts.push({ name: 'origin', ref: user.origin });
        }
        this.getDirections()
          .then((dirs) => {
            this.directionsRequest = { recieved: true, data: dirs };
          })
          .catch((er) => {
            this.error = { has: true, message: er.toString() };
          });
      })
      .catch((er) => {
        this.error = {
          has: true,
          message: er.toString(),
        };
      });
    Backend.canEdit(this.userid, this.routeUserId)
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
