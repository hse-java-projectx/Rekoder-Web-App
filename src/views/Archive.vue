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
          :key="item.name"
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
import DirectoryItem from '@/components/archive/DirectoryItem.vue';
import SubNavbar from '@/components/SubNavbar.vue';
import HeaderPath from '@/components/HeaderPath.vue';
import BackendMixin from '@/mixins/backend/main';

export default {
  mixins: [BackendMixin],
  name: 'Archive',
  data() {},
  components: {
    DirectoryItem,
    SubNavbar,
    HeaderPath,
  },
  computed: {
    routeUsername() {
      return this.$route.params.username;
    },

    routeFolderId() {
      return this.$route.params.folderId;
    },

    path() {
      const result = [];
      this.backend.getPathToRoot(this.routeFolderId()).forEach((name, id) => {
        result.push({ name, link: `/profile/${this.routeUsername()}/archive/${id}` });
      });
      return result;
    },

    directions() {
      const dirs = [];
      this.backend
        .getFolderContent(this.routeUsername(), this.routeFolderId())
        .forEach((name, isDirectory, solved, id) => {
          dirs.push({
            name,
            isDirectory,
            solved,
            link: isDirectory
              ? `/profile/${this.routeUsername()}/archive/${id}`
              : `/profile/${this.routeUsername()}/submission/${id}`,
          });
        });
      return dirs;
    },
  },
};
</script>
