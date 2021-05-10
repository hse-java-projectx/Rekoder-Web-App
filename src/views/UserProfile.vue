<template>
  <div>
    <NotFound v-if="error.has" :message="error.message" />
    <HorCylon v-if="!user.recieved" />
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
        <FeedBlock name="Archive">
          <template #content>
            <HorCylon v-if="!archiveDirections.recieved" />
            <NothingToShow
              v-else-if="archiveDirections.data.length === 0"
              message="Archive is empty" />
            <b-list-group v-else>
              <DirectoryItem
                v-for="item in archiveDirections.data"
                :key="item.link"
                :name="item.name"
                :isDirectory="item.isDirectory"
                :link="item.link"
                :solved="item.solved"
              ></DirectoryItem></b-list-group
          ></template>
        </FeedBlock>
        <FeedBlock name="Recent activity">
          <template #content>
            <HorCylon v-if="!activities.recieved" />
            <ActivityFeed v-else :activities="activities.data" :anon="true" />
          </template>
        </FeedBlock>
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
      user: {
        recieved: false,
        data: [],
      },
      activities: {
        recieved: false,
        data: [],
      },
      statRefs: [],
      contacts: [],
      archiveDirections: {
        recieved: false,
        data: null,
      },
      rootFolderId: null,
    };
  },

  methods: {
    async getDirections() {
      const dirs = [];
      const folderContent = await Backend.getFolderContent(this.routeUserId, this.rootFolderId);
      this.folder = {
        recieved: true,
        data: folderContent,
      };
      this.folderPrivacy = folderContent.privacy;
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
        this.error = {
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
        this.rootFolderId = user.root;
        this.getDirections()
          .then((dirs) => {
            this.archiveDirections = { recieved: true, data: dirs };
          })
          .catch((er) => {
            this.error = { has: true, message: er.toString };
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
