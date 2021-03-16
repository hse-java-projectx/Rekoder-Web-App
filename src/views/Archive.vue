<template>
  <div>
    <SplitView>
      <template #header>
        <SubNavbar>
          <template #left>
            <HorCylon v-if="!path.recieved" />
            <HeaderPath v-else :path="path.data" />
          </template>
          <template #right> </template>
        </SubNavbar>
      </template>
      <template #content>
        <div class="page-item-container">
          <div class="text-left">
            <b-button variant="outline-primary" class="m-1" size="sm">
              New Problem
              <b-icon icon="file-plus" class="text-primary" />
            </b-button>
            <b-button variant="outline-primary" class="m-1" size="sm" aria-label="sdfa">
              New Folder
              <b-icon icon="folder-plus" class="text-primary" />
            </b-button>
          </div>
          <hr class="mt-1 w-100"/>
          <HorCylon v-if="!directions.recieved" />
          <b-list-group v-else>
            <DirectoryItem
              v-for="item in directions.data"
              :key="item.link"
              :name="item.name"
              :isDirectory="item.isDirectory"
              :link="item.link"
              :solved="item.solved"
            ></DirectoryItem
          ></b-list-group>
        </div>
      </template>
      <template #additional>
        <ProfileCardLayout :userId="routeUserId" />
      </template>
    </SplitView>
  </div>
</template>

<script>
import Backend from '@/js/backend/main';

import DirectoryItem from '@/components/archive/DirectoryItem.vue';
import SubNavbar from '@/components/SubNavbar.vue';
import HeaderPath from '@/components/HeaderPath.vue';
import HorCylon from '@/components/animated/HorCylon.vue';
import SplitView from '@/components/SplitView.vue';
import ProfileCardLayout from '@/components/profile/ProfileCardLayout.vue';

export default {
  name: 'Archive',
  data() {
    return {
      links: [
        {
          name: 'teams',
          num: 3,
          ref: 'teams',
        },
        {
          name: 'followers',
          num: 281,
          ref: 'followers',
        },
        {
          name: 'following',
          num: 12,
          ref: 'following',
        },
      ],
      routeUserId: this.$route.params.userId,
      routeFolderId: this.$route.params.folderId,
      path: {
        recieved: false,
        data: [],
      },
      directions: {
        recieved: false,
        data: [],
      },
    };
  },
  components: {
    DirectoryItem,
    SubNavbar,
    HeaderPath,
    HorCylon,
    SplitView,
    ProfileCardLayout,
  },

  created() {
    this.getPathToRoot().then((path) => {
      this.path = {
        recieved: true,
        data: path,
      };
    });
    this.getDirections().then((dirs) => {
      this.directions = {
        recieved: true,
        data: dirs,
      };
    });
  },

  methods: {
    async getPathToRoot() {
      const result = [];
      const pathToRoot = await Backend.getPathToRoot(this.routeFolderId);
      pathToRoot.forEach((folder) => {
        result.push({
          name: folder.name,
          link: `/profile/${this.routeUserId}/archive/${folder.id}`,
        });
      });
      return result;
    },

    async getDirections() {
      const dirs = [];
      const folderContent = await Backend.getFolderContent(this.routeUserId, this.routeFolderId);
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
};
</script>
