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

export default {
  name: 'Archive',
  data() {
    return {
      owner: 'Gleb Marin',
      path: [
        { name: 'Glebanister', link: 'user/Glebanister' },
        { name: 'root', link: 'user/Glebanister/root' },
        { name: 'collections', link: 'user/Glebanister/root/collections' },
      ],
      directions: [
        {
          name: 'leetcode',
          isDirectory: true,
          link: '/leetcode',
          solved: false,
        },
        {
          name: 'codefoeces',
          isDirectory: true,
          link: '/codefoeces',
          solved: true,
        },
        {
          name: 'A + B Problem',
          isDirectory: false,
          link: '/aplusb',
          solved: true,
        },
        {
          name: 'Find path',
          isDirectory: false,
          link: '/findpath',
          solved: false,
        },
        {
          name: '3-SAT',
          isDirectory: false,
          link: '/3sat',
          solved: false,
        },
        {
          name: 'collection',
          isDirectory: true,
          link: '/collection',
          solved: null,
        },
      ],
    };
  },
  components: {
    DirectoryItem,
    SubNavbar,
    HeaderPath,
  },
};
</script>
