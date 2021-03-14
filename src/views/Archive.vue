<template>
  <div>
    <SubNavbar>
      <template #left>
        <HeaderPath :path="path" />
      </template>
      <template #right>
        <b-icon icon="folder-plus" class="text-primary" />
      </template>
    </SubNavbar>
    <div class="page-item-container">
      <b-list-group>
        <DirectoryItem
          v-for="item in directions"
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

export default {
  name: 'Archive',
  data() {
    return {
      routeUserId: this.$route.params.userId,
      routeFolderId: this.$route.params.folderId,
    };
  },
  components: {
    DirectoryItem,
    SubNavbar,
    HeaderPath,
  },

  computed: {
    path() {
      const result = [];
      Backend.getPathToRoot(this.routeFolderId).forEach((folder) => {
        result.push({
          name: folder.name,
          link: `/profile/${this.routeUserId}/archive/${folder.id}`,
        });
      });
      return result;
    },

    directions() {
      const dirs = [];
      Backend.getFolderContent(this.routeUserId, this.routeFolderId).forEach(
        (dir) => {
          dirs.push({
            name: dir.name,
            isDirectory: dir.isDirectory,
            solved: dir.solved,
            link: dir.isDirectory
              ? `/profile/${this.routeUserId}/archive/${dir.id}`
              : `/profile/${this.routeUserId}/problem/${dir.id}`,
          });
        },
      );
      return dirs;
    },
  },
};
</script>
