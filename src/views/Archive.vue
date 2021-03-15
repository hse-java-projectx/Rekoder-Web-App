<template>
  <div>
    <SubNavbar>
      <template #left>
        <HorCylon v-if="!path.recieved" />
        <HeaderPath v-else :path="path.data" />
      </template>
      <template #right>
        <b-icon icon="folder-plus" class="text-primary" />
      </template>
    </SubNavbar>
    <div class="page-item-container">
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
  </div>
</template>

<script>
import Backend from '@/js/backend/main';

import DirectoryItem from '@/components/archive/DirectoryItem.vue';
import SubNavbar from '@/components/SubNavbar.vue';
import HeaderPath from '@/components/HeaderPath.vue';
import HorCylon from '@/components/animated/HorCylon.vue';

export default {
  name: 'Archive',
  data() {
    return {
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
